import { API_ENDPOINTS } from "./endpoints"
import { RootStore, setupRootStore } from "../../"
import { BASE_MODEL_TEST } from "../../api/endpoint.test.types" //PAGINATION_TEST
// import { API_ENDPOINT, ORDERING_FILTER, PAGINATION_FILTERS, UTILS } from "../../api/endpoint.types"
import * as storage from "../../../utils/mobile-storage"
import FormData from "form-data"
import request from "request"
const USER_MODEL_TEST = {
    ...BASE_MODEL_TEST,
    email: expect.any(String),
    full_name: expect.any(String),
    avatar: expect.any(String),
    phone: expect.toBeOneOf([expect.any(String), null]), //.toBeOneOf([String, null]),
    is_terms_agreed: expect.any(Boolean),
    is_phone_verified: expect.any(Boolean),
    is_email_verified: expect.any(Boolean),
    birth_certificate_front: expect.toBeOneOf([expect.any(String), null]), //.toBeOneOf([String, null]),
    birth_certificate_back: expect.toBeOneOf([expect.any(String), null]), //.toBeOneOf([String, null]),
    gender: expect.toBeOneOf(["Male", "Female", null]),
    date_of_birth: expect.toBeOneOf([expect.any(Date), null]),
    nationality: expect.toBeOneOf([expect.any(String), expect.any(Array)]), //toBeOneOf([String, Array]),
    partner_nationality: expect.toBeOneOf([expect.any(String), expect.any(Array)]), //.toBeOneOf([String, Array]),
    referral_source: expect.toBeOneOf([expect.anything(), null]),
    match_accuracy: expect.any(Number),
    national_id_back: expect.toBeOneOf([expect.any(String), null]), //toBeOneOf([String, null]),
    national_id_front: expect.toBeOneOf([expect.any(String), null]), //toBeOneOf([String, null])
}

const REFERRAL_SOURCE_TEST = {
    name: expect.any(String),
    description: expect.any(String),
}

describe("Consumer Integration Tests", () => {
    let rootStore: RootStore = null
    beforeAll(async () => {
        rootStore = await setupRootStore()
        return rootStore
    })
    // let sampleId = ""
    let editData = {
        national_id_back: "https://unsplash.com/photos/SE5wx-EmRLo",
        birth_certificate_back: "https://unsplash.com/photos/SE5wx-EmRLo",
        national_id_front: "https://unsplash.com/photos/SE5wx-EmRLo",
        birth_certificate_front: "https://unsplash.com/photos/SE5wx-EmRLo",
        // avatar: image_68,
    }
    let nonce = new Date()
    let testUserCredentials = {
        email: `testuser${nonce.getTime()}@mailinator.com`,
        password1: "High@123",
        password2: "High@123",
        full_name: `api_tester${nonce.getTime()}`,
    }
    //-------------------------------------------- sign up user test (test one)------------------------------------------------
    test("Signup User Endpoint", async () => {
        const res = await rootStore.userStore.environment.api.call(
            API_ENDPOINTS.registerUser,
            testUserCredentials,
        )

        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject({
            access_token: expect.any(String),
            refresh_token: expect.any(String),
            user: expect.any(Object),
        })
        expect(res.data.user).toMatchObject({
            ...USER_MODEL_TEST,
        })
        if (res.data.user.referral_source.length) {
            expect(res.data.user.referral_source).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(
                        {
                            ...REFERRAL_SOURCE_TEST
                        }
                    )
                ])
            )
        }
        expect(res.data.user.email).toBe(testUserCredentials.email)
    })
    //------------------------------------------ login test (test 2) -----------------------------------------------------------
    test("Login User Endpoint", async () => {
        const res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.loginUser, {
            email: testUserCredentials.email,
            password: testUserCredentials.password1,
        })
        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject({
            access_token: expect.any(String),
            refresh_token: expect.any(String),
            user: expect.any(Object),
        })
        expect(res.data.user).toMatchObject({
            ...USER_MODEL_TEST,
        })
        if (res.data.user.referral_source.length) {
            expect(res.data.user.referral_source).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(
                        {
                            ...REFERRAL_SOURCE_TEST
                        }
                    )
                ])
            )
        }
        expect(res.data.user.email).toBe(testUserCredentials.email)
        storage.setItem(rootStore.userStore.environment.api.config.token_key, res.data.access_token)
    })
    //----------------------------------------- test for loggedIn user -----------------------------------------------------
    test("Get user detail endpoint test", async () => {
        const res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.getUser)
        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject({
            ...USER_MODEL_TEST,
        })
    })
    //------------------------------------------ test for User Update------------------------------------------
    test("User Update endpoint test", async () => {
        var form = new FormData()
        // download image from url
        const download = require("images-downloader").images
        const dest = "./assets/images"
        const images = ["https://commons.wikimedia.org/static/images/project-logos/commonswiki.png"]
        let result = await download(images, dest)
        // doenload image by help of request
        form.append(
            "avatar",
            await request(
                "https://commons.wikimedia.org/static/images/project-logos/commonswiki.png",
            ),
        )
        const formHeaders = form.getHeaders()
        // console.log('this is hearder form header -- ', form)
        const res = await rootStore.userStore.environment.api.call(
            API_ENDPOINTS.editUser,
            form,
            null,
            {
                ...formHeaders,
                // form.get("avatar")
                "Content-Length": "5552",
            },
        )
        // console.log('this is response header === ', res.config.headers)
        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject({
            ...USER_MODEL_TEST,
        })
    })
    //---------------------------- test for verification email--------------------------------------------------
    test("Resend Verification Email Endpoint Test", async () => {
        const res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.resendEmail, {
            email: testUserCredentials.email,
        })
        expect(res.ok).toBe(true)
    })
    //------------------------------- test for Change Password -----------------------------------------------------
    test("Change Password Endpoint Test", async () => {
        const res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.changePassword, {
            email: testUserCredentials.email,
            new_password1: "Hello@12345",
            new_password2: "Hello@12345",
        })
        expect(res.ok).toBe(true)
    })
    //
    // test("About US Endpoint Test", async () => {
    //     const res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.aboutUs)
    //         expect(res.ok).toBe(true)
    //         // expect(res.data).toMatchObject({
    //         //     ...USER_MODEL_TEST,
    //         // })
    // })
    // //------------------------------------- test for lougout-------------------------------------
    // test("Logout Endpoint Test", async () => {
    //   const res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.logoutuser)
    //   expect(res.ok).toBe(true)
    // })
})
