import { API_ENDPOINT, REQUEST_METHOD } from "../../api/endpoint.types"
import * as SCHEMAS from "./schemas"

const TRANSFORMERS = {
    referralSource: (data) => ({
        ...data,
    }),
    userTransformer: (data) => ({
        ...data,
        created_on: new Date(data.created_on),
        edited_on: new Date(data.edited_on),
        date_of_birth: new Date(data.date_of_birth),
        is_partner_nationality_important:
            data.is_partner_nationality_important === undefined
                ? false
                : data.is_partner_nationality_important,
        referral_source:
            data.referral_source == null
                ? data.referral_source.map((referralSource: any) => {
                      return TRANSFORMERS.referralSource(referralSource)
                  })
                : data.referral_source,
    }),
    userPaginatedTransformer: (data) => ({
        ...data,
        count: parseInt(data.count),
        results: data.results.map(TRANSFORMERS.userTransformer)
    }),
    accessTokenTransformer: (data) => ({
        ...data,
        user: TRANSFORMERS.userTransformer(data.user),
    }),
}

export const API_ENDPOINTS = {
    registerUser: new API_ENDPOINT({
        url: "/auth/registration/",
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.LoggedInUser,
        transformer: TRANSFORMERS.accessTokenTransformer,
    }),
    loginUser: new API_ENDPOINT({
        url: "/auth/login/",
        method: REQUEST_METHOD.POST,
        response: SCHEMAS.LoggedInUser,
        transformer: TRANSFORMERS.accessTokenTransformer,
    }),
    verifyEmail: new API_ENDPOINT({
        url: "/auth/onboarding/verify-email/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    resendVerificationEmail: new API_ENDPOINT({
        url: "/auth/onboarding/verify-email/resend/",
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: null,
    }),
    verifyPhoneNumber: new API_ENDPOINT({
        url: "/auth/onboarding/verify-phone-number/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    resendVerificationSMS: new API_ENDPOINT({
        url: "auth/onboarding/verify-phone-number/resend/",
        method: REQUEST_METHOD.GET,
        response: null,
        transformer: null,
    }),
    changePassword: new API_ENDPOINT({
        url: "/auth/password/change/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    resetPassword: new API_ENDPOINT({
        url: "/auth/password/reset/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    getLoggedInUser: new API_ENDPOINT({
        url: "/auth/user/",
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.User,
        transformer: TRANSFORMERS.userTransformer,
    }),
    editUser: new API_ENDPOINT({
        url: "/auth/user/",
        method: REQUEST_METHOD.PATCH,
        response: SCHEMAS.User,
        transformer: TRANSFORMERS.userTransformer,
    }),
    logoutuser: new API_ENDPOINT({
        url: "/auth/logout/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer: null,
    }),
    getReferralSource: new API_ENDPOINT({
        url: "/auth/onboarding/referral-source/",
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.ReferralSource,
        transformer: null,
    }),
    termsOfUse: new API_ENDPOINT({
        url: "/auth/onboarding/terms-of-use/",
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.TermsOfUse,
        transformer: null,
    }),
    getTermsVideo: new API_ENDPOINT({
        url: "/auth/onboarding/terms_video/",
        method: REQUEST_METHOD.GET,
        response: SCHEMAS.User,
        transformer: TRANSFORMERS.userTransformer,
    }),
}
