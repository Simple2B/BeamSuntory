import app.schema as s

DELIVERY_AGENT_ROLES = (
    s.UserRole.DELIVERY_AGENT.value,
    s.UserRole.WAREHOUSE_MANAGER.value,
)
ADMIN_WAREHOUSE_ROLES = (
    s.UserRole.ADMIN.value,
    s.UserRole.WAREHOUSE_MANAGER.value,
)
