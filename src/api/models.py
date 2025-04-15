from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String, Text, Date, DECIMAL, ForeignKey, Enum, TIMESTAMP, func, CheckConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column

db = SQLAlchemy()

# Mixin para timestamps
class TimestampMixin:
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, server_default=func.current_timestamp())
    updated_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, server_default=func.current_timestamp(), onupdate=func.current_timestamp())


class User(db.Model):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    lastname: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    birthdate: Mapped[Date] = mapped_column(Date, nullable=False)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)

    favorites = relationship("Favorite", back_populates="user", cascade="all, delete")
    cart_items = relationship("Cart", back_populates="user", cascade="all, delete")
    orders = relationship("Order", back_populates="user", cascade="all, delete")

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "birthdate": str(self.birthdate),
            "address": self.address,
            "phone": self.phone
        }


class Category(db.Model):
    __tablename__ = 'categories'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    products = relationship("Product", back_populates="category", cascade="all, delete")

    def __repr__(self):
        return f"<Category {self.name}>"


class Product(TimestampMixin, db.Model):
    __tablename__ = 'products'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    price: Mapped[DECIMAL] = mapped_column(DECIMAL(10, 2), nullable=False)
    stock: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    category_id: Mapped[int | None] = mapped_column(Integer, ForeignKey('categories.id', ondelete='SET NULL'))
    image_url: Mapped[str | None] = mapped_column(String(255), nullable=True)

    category = relationship("Category", back_populates="products")
    favorites = relationship("Favorite", back_populates="product", cascade="all, delete")
    cart_items = relationship("Cart", back_populates="product", cascade="all, delete")
    order_items = relationship("OrderItem", back_populates="product")

    __table_args__ = (
        CheckConstraint('stock >= 0', name='check_stock_positive'),
    )

    def __repr__(self):
        return f"<Product {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": float(self.price),
            "stock": self.stock,
            "category": self.category.name if self.category else None,
            "image_url": self.image_url,
            "created_at": str(self.created_at),
            "updated_at": str(self.updated_at)
        }


class Favorite(db.Model):
    __tablename__ = 'favorites'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    product_id: Mapped[int] = mapped_column(Integer, ForeignKey('products.id', ondelete='CASCADE'), nullable=False)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, server_default=func.current_timestamp())

    user = relationship("User", back_populates="favorites")
    product = relationship("Product", back_populates="favorites")


class Cart(TimestampMixin, db.Model):
    __tablename__ = 'carts'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    product_id: Mapped[int] = mapped_column(Integer, ForeignKey('products.id', ondelete='CASCADE'), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)

    user = relationship("User", back_populates="cart_items")
    product = relationship("Product", back_populates="cart_items")

    __table_args__ = (
        CheckConstraint('quantity > 0', name='check_quantity_positive'),
    )


class Order(db.Model):
    __tablename__ = 'orders'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    total_price: Mapped[DECIMAL] = mapped_column(DECIMAL(10, 2), nullable=False)
    status: Mapped[str] = mapped_column(Enum('pending', 'paid', 'shipped', 'delivered', 'canceled', name='order_status'), default='pending')
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, server_default=func.current_timestamp())

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete")

    def __repr__(self):
        return f"<Order {self.id} - {self.status}>"


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(Integer, ForeignKey('orders.id', ondelete='CASCADE'), nullable=False)
    product_id: Mapped[int | None] = mapped_column(Integer, ForeignKey('products.id', ondelete='SET NULL'))
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    price: Mapped[DECIMAL] = mapped_column(DECIMAL(10, 2), nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
