export type AdminRole =
  "SUPER_ADMIN" | "ADMIN" | "ACCOUNTANT" | "COORDINATOR" | "OPERATOR";

export enum Permission {
  DASHBOARD_READ = "DASHBOARD_READ",
  BOOKING_READ = "BOOKING_READ",
  BOOKING_CREATE = "BOOKING_CREATE",
  BOOKING_UPDATE = "BOOKING_UPDATE",
  BOOKING_DELETE = "BOOKING_DELETE",
  PAYMENT_READ = "PAYMENT_READ",
  PAYMENT_CREATE = "PAYMENT_CREATE",
  PAYMENT_UPDATE = "PAYMENT_UPDATE",
  ANALYTICS_READ = "ANALYTICS_READ",
  USER_MANAGE = "USER_MANAGE",
}

export type PermissionType = Permission | keyof typeof Permission;

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  SUPER_ADMIN: [
    Permission.DASHBOARD_READ,
    Permission.BOOKING_READ,
    Permission.BOOKING_CREATE,
    Permission.BOOKING_UPDATE,
    Permission.BOOKING_DELETE,
    Permission.PAYMENT_READ,
    Permission.PAYMENT_CREATE,
    Permission.PAYMENT_UPDATE,
    Permission.ANALYTICS_READ,
    Permission.USER_MANAGE,
  ],
  ADMIN: [
    Permission.DASHBOARD_READ,
    Permission.BOOKING_READ,
    Permission.BOOKING_CREATE,
    Permission.BOOKING_UPDATE,
    Permission.PAYMENT_READ,
    Permission.PAYMENT_CREATE,
    Permission.PAYMENT_UPDATE,
    Permission.ANALYTICS_READ,
  ],
  ACCOUNTANT: [
    Permission.DASHBOARD_READ,
    Permission.BOOKING_READ,
    Permission.PAYMENT_READ,
    Permission.PAYMENT_CREATE,
    Permission.PAYMENT_UPDATE,
    Permission.ANALYTICS_READ,
  ],
  COORDINATOR: [Permission.DASHBOARD_READ, Permission.BOOKING_READ],
  OPERATOR: [
    Permission.DASHBOARD_READ,
    Permission.BOOKING_READ,
    Permission.BOOKING_CREATE,
    Permission.BOOKING_UPDATE,
  ],
};

export interface AuthContext {
  id: string;
  name?: string | null;
  email?: string | null;
  role: AdminRole;
  coordinatorId?: string | null;
}

/**
 * Single, central permission check function (Browser & Server Safe).
 * SUPER_ADMIN role automatically bypasses all permission checks (returns true).
 */
export function hasPermission(
  role: AdminRole | string | undefined,
  permission: PermissionType
): boolean {
  if (!role) return false;
  const userRole = role as AdminRole;

  // Super Admin Bypass
  if (userRole === "SUPER_ADMIN") {
    return true;
  }

  // Resolve legacy alias strings if passed
  const targetPermission = (Permission[permission as keyof typeof Permission] ||
    permission) as Permission;

  const allowedPermissions = ROLE_PERMISSIONS[userRole] || [];
  return allowedPermissions.includes(targetPermission);
}

/**
 * Resource-level access helper for granular ownership checks (e.g. Coordinator booking ownership).
 */
export function hasResourceAccess(
  user: AuthContext,
  resourceType: "booking",
  resource: { coordinatorId?: string | null; coordinatorName?: string | null }
): boolean {
  // Super Admin, Admin, Accountant, Operator have global access to all booking resources
  if (user.role !== "COORDINATOR") {
    return true;
  }

  // Coordinator role: verify assigned resource ownership
  if (user.coordinatorId && resource.coordinatorId) {
    return user.coordinatorId === resource.coordinatorId;
  }
  if (user.name && resource.coordinatorName) {
    return (
      user.name.toLowerCase().trim() ===
      resource.coordinatorName.toLowerCase().trim()
    );
  }

  return false;
}
