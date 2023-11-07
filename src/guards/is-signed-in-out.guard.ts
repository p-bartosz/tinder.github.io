import AuthService from "@/firebase/AuthService";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function notAuthorisedOnly(
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  AuthService.isLogin.value
    ? next('/')
    : next();
}
