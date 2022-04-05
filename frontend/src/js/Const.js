export const ROUTES = {
    HOME: 'home',
    LOGIN: 'login',
    REGISTER: 'register',
    FORGOT_PASSWORD: 'reset-password',
    RESET_PASSWORD: 'reset',
    VERIFY: 'verify',
};

let ROLES_ = {
    NONE: 0,
    VIEW_DASHBOARD: 0x1 << 0,
    VIEW_USERS: 0x1 << 1,
    ADD_USERS: 0x1 << 2,
    DELETE_USERS: 0x1 << 3,
    UPDATE_USERS: 0x1 << 4,
    ALL: 0xFFFFFF
};

ROLES_.GUESTS = ROLES_.NONE;
ROLES_.USER = (ROLES_.VIEW_DASHBOARD | ROLES_.VIEW_USERS);
ROLES_.ADMIN = (ROLES_.ALL);
ROLES_.SUPERUSER = ROLES_.ALL;

export const ROLES = ROLES_;
export const isPermitted = (role, permission) => {
    return !(!(parseInt(role) & permission));
};
