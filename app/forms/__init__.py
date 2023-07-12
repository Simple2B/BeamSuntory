# flake8: noqa F401
from .auth import LoginForm, RegistrationForm, ForgotForm, ChangePasswordForm
from .user import UserForm, NewUserForm
from .group import GroupForm, NewGroupForm, MasterGroupForm, NewMasterGroupForm
from .product import ProductForm, NewProductForm
from .group_for_product import (
    GroupProductForm,
    NewGroupProductForm,
    MasterGroupProductForm,
    NewMasterGroupProductForm,
)
from .warehouse import WarehouseForm, NewWarehouseForm
