import { types, flow } from "mobx-state-tree";
import { withEnvironment } from "../../extensions/with-environment";
import { ACTION_RESPONSES } from "../../api/endpoint.types";
import globalKeyStore from "../../api/global-key-store";
import * as UserSchemas from "./schemas";
import { API_ENDPOINTS } from "./endpoints";
import * as storage from "localforage";
import { TermsOfUse } from "./schemas";
/**
 * Model description here for TypeScript hints.
 */

export const UserStore = types
  .model({
    loggedInUserData: types.maybeNull(UserSchemas.LoggedInUser),
    userData: types.maybeNull(UserSchemas.User),
    termsOfUse: types.maybeNull(UserSchemas.TermsOfUse),
    referralSourceData: types.maybeNull(UserSchemas.ReferralSourcePaginated),
    is_logged_in: types.maybeNull(types.boolean),
    remember_me: types.maybeNull(types.boolean),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    loginUser: flow(function* (email: string, password: string) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.loginUser,
        {
          email: email,
          password: password,
        }
      );
      switch (response.status) {
        case 200:
          self.is_logged_in = true;
          self.loggedInUserData = null;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(
            response.data
          );
          storage.clear();
          storage.setItem(
            self.environment.api.config.token_key,
            response.data[self.environment.api.config.token_key]
          );
          return true;
        case 400:
        case 401:
          return false;
        case 500:
          return false;
        default:
          console.error("UNHANDLED ERROR");
          return true;
      }
    }),
    signupUser: flow(function* (
      full_name: string,
      email: string,
      password1: string,
      password2: string
    ) {
      storage.clear();
      self.is_logged_in = false;
      const response = yield self.environment.api.call(
        API_ENDPOINTS.registerUser,
        {
          full_name: full_name,
          email: email,
          password1: password1,
          password2: password2,
        }
      );
      let error = null;
      switch (response.status) {
        case 201:
          self.is_logged_in = true;
          self.loggedInUserData = UserSchemas.LoggedInUser.create(
            response.data
          );
          storage.setItem(
            self.environment.api.config.token_key,
            response.data[self.environment.api.config.token_key]
          );
          return ACTION_RESPONSES.success;
        case 400:
          error = response.data;
          break;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    verifyEmail: flow(function* (otp: number) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.verifyEmail,
        {
          otp: otp,
        }
      );
      switch (response.status) {
        case 200:
          self.loggedInUserData.user.is_email_verified = true;
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    resendVerificationEmail: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.resendVerificationEmail
      );
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    verifyPhoneNumber: flow(function* (otp: number) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.verifyPhoneNumber,
        {
          otp: otp,
        }
      );
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        default:
          console.error("UNHANDLED ERROR");
      }
      return ACTION_RESPONSES.failure;
    }),
    resendVerificationSMS: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.resendVerificationSMS
      );
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        default:
          console.error("UNHANDLED ERROR");
      }
      return ACTION_RESPONSES.failure;
    }),
    getLoggedInUser: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.getLoggedInUser
      );
      switch (response.status) {
        case 200:
          self.loggedInUserData.user = UserSchemas.User.create(response.data);
          self.is_logged_in = true;
          return ACTION_RESPONSES.success;
        case 405:
          storage.clear();
          self.is_logged_in = false;
          break;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    getReferralSource: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.getReferralSource
      );
      switch (response.status) {
        case 200:
          self.referralSourceData = UserSchemas.ReferralSourcePaginated.create(
            response.data
          );
          return ACTION_RESPONSES.success;
        case 401:
          console.log("Authentication credentials were not provided.");
          return ACTION_RESPONSES.failure;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
    }),
    rememberMe: flow(function* (val: boolean) {
      self.remember_me = val;
    }),
    editUser: flow(function* (
      data:
        | {
            full_name?: string | null;
            national_id_back?: null | string;
            nationality?: any | null;
            birth_certificate_back?: any | null;
            phone?: any | null;
            national_id_front?: any | null;
            birth_certificate_front?: any | null;
            email?: null | string;
            partner_nationality?: any | null;
            match_accuracy?: number | null;
            date_of_birth?: any | null;
            is_terms_agreed?: null | boolean;
            is_phone_verified?: null | boolean;
            avatar?: any | null;
            is_email_verified?: null | boolean;
            gender?: string | null;
            referral_source?: any | null;
            is_partner_nationality_important?: null | boolean;
          }
        | FormData
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.editUser,
        data
      );
      switch (response.status) {
        case 200:
          self.loggedInUserData.user = UserSchemas.User.create(response.data);
          return ACTION_RESPONSES.success;
        case 400:
          return ACTION_RESPONSES.failure;
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    logoutUser: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.logoutuser
      );
      switch (response.status) {
        case 204:
        case 200:
          self.is_logged_in = false;
          storage.removeItem(self.environment.api.config.token_key);
          storage.clear();
          return true;
        default:
          storage.clear();
          console.error("UNHANDLED ERROR");
          break;
      }
      return false;
    }),
    resendEmail: flow(function* (email: string | null) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.resendVerificationEmail,
        { email }
      );
      switch (response.status) {
        case 200:
          // here we have design a modal which will be showing the message of resend email
          return true;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
      return false;
    }),
    changePassword: flow(function* (
      new_password1: string,
      new_password2: string
    ) {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.changePassword,
        {
          new_password1: new_password1,
          new_password2: new_password2,
        }
      );
      let error = null;
      switch (response.status) {
        case 200:
          return ACTION_RESPONSES.success;
        case 400:
          error = response.data;
          break;
        case 401:
          return ACTION_RESPONSES.failure;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
      return ACTION_RESPONSES.failure;
    }),
    getTermsOfUse: flow(function* () {
      const response = yield self.environment.api.call(
        API_ENDPOINTS.termsOfUse
      );
      switch (response.status) {
        case 200:
          self.termsOfUse = UserSchemas.TermsOfUse.create(response.data);
          return ACTION_RESPONSES.success;
        case 401:
          console.log("Authentication credentials were not provided.");
          return ACTION_RESPONSES.failure;
        default:
          console.error("UNHANDLED ERROR");
          break;
      }
    }),
  }));
