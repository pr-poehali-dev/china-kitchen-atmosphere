import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartSidebar = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartSidebarProps) => {
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseInt(item.price.replace('₽', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-chinese-black border-l border-chinese-red/30 z-50 transform transition-transform duration-500 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 border-b border-chinese-red/30">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-chinese-gold flex items-center">
              <Icon name="ShoppingCart" size={24} className="mr-2" />
              Корзина
              {getTotalItems() > 0 && (
                <Badge className="ml-2 bg-chinese-red text-white animate-bounce-in">
                  {getTotalItems()}
                </Badge>
              )}
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-chinese-gold hover:text-white hover:bg-chinese-red/20"
            >
              <Icon name="X" size={24} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-50">🛒</div>
              <p className="text-gray-400 mb-4">Корзина пуста</p>
              <p className="text-sm text-gray-500">Добавьте блюда из меню</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-chinese-dark/50 border-chinese-red/20 animate-slide-in-left">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-chinese-gold text-sm">{item.name}</h3>
                        <p className="text-chinese-red font-bold">{item.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0 border-chinese-gold text-chinese-gold hover:bg-chinese-gold hover:text-black"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Icon name="Minus" size={14} />
                        </Button>
                        <span className="w-8 text-center text-white font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0 border-chinese-gold text-chinese-gold hover:bg-chinese-gold hover:text-black"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={14} />
                        </Button>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-chinese-red/30 p-6 bg-chinese-dark/30">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-white">Итого:</span>
              <span className="text-2xl font-bold text-chinese-gold">
                {getTotalPrice().toLocaleString()}₽
              </span>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full bg-chinese-red hover:bg-chinese-red/80 text-white py-3 animate-glow">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Оформить заказ
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-chinese-gold text-chinese-gold hover:bg-chinese-gold hover:text-black"
                onClick={onClose}
              >
                Продолжить покупки
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;