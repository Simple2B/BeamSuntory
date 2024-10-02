import app.schema as s

DELIVERY_AGENT_ROLES = (
    s.UserRole.DELIVERY_AGENT.value,
    s.UserRole.WAREHOUSE_MANAGER.value,
)
ADMIN_WAREHOUSE_ROLES = (
    s.UserRole.ADMIN.value,
    s.UserRole.WAREHOUSE_MANAGER.value,
)

ALL_ROLE_WITHOUT_SALE_REP = (
    s.UserRole.ADMIN.value,
    s.UserRole.MANAGER.value,
    s.UserRole.WAREHOUSE_MANAGER.value,
    s.UserRole.DELIVERY_AGENT.value,
)
