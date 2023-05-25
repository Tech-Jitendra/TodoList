import { Instance, types } from "mobx-state-tree"
import { maybeNull } from "mobx-state-tree/dist/internal"
import { BaseModelSchemaBase, PaginatedSchemaBase } from "../../api/endpoint.types"

export const ReferralSource = types.model({
  // ...BaseModelSchemaBase,
  id: types.identifier,
  name: types.string,
  description: types.maybeNull(types.string),

})
export interface ReferralSource extends Instance<typeof ReferralSource> { }

export const ReferralSourcePaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.array(ReferralSource),
})
export interface ReferralSourcePaginated extends Instance<typeof ReferralSourcePaginated> { }

// user schema 
export const User = types.model({
  ...BaseModelSchemaBase,
  email: types.string,
  full_name: types.maybeNull(types.string),
  avatar: types.string,
  phone: types.maybeNull(types.string),
  is_terms_agreed: types.boolean,
  is_phone_verified: types.boolean,
  is_email_verified: types.boolean,
  birth_certificate_front: types.maybeNull(types.string),
  birth_certificate_back: types.maybeNull(types.string),
  gender: types.maybeNull(types.enumeration(["Male", "Female"])),
  date_of_birth: types.maybeNull(types.Date),
  nationality: types.array(types.string),
  partner_nationality: types.array(types.string),
  referral_source: types.maybeNull(types.array(types.string)),
  match_accuracy: types.number,
  national_id_back: types.maybeNull(types.string),
  national_id_front: types.maybeNull(types.string),
  is_partner_nationality_important: types.boolean,
})
export interface UserType extends Instance<typeof User> { }
export const UserPaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.array(User),
})
export interface UserPaginatedType extends Instance<typeof UserPaginated> { }

// logged in user schema
export const LoggedInUser = types.model({
  user: User,
  access_token: types.string,
  refresh_token: types.string,
})

export interface LoggedInUserType extends Instance<typeof LoggedInUser> { }
export const LoggedInUserPaginated = types.model({
  ...PaginatedSchemaBase,
  results: types.array(LoggedInUser),
})
export interface LoggedInUserPaginatedType extends Instance<typeof LoggedInUserPaginated> { }
export const TermsOfUse = types.model({
  // ...BaseModelSchemaBase,
  privacy_policy: types.identifier,
  terms_of_use: types.string,
  agree_conditions: types.array(types.string),

})
export const Action = types.model({
  // ...BaseModelSchemaBase,
  label: types.string,
  target_external_url: types.string,
  target_internal_url: types.string,
})