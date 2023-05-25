import { RootStore, setupRootStore } from "../../"
import * as storage from "../../../utils/mobile-storage"
//import { UTILS } from "../../api/endpoint.types"
describe("Store Tests", () => {
    let rootStore: RootStore = null
    beforeAll(async () => {
        rootStore = await setupRootStore()
        return rootStore
    })
    let sampleId = null
    let nonce = new Date()
    let testUserCredentials = {
        email: `testuser${nonce.getTime()}@mailinator.com`,
        password1: "High@123",
        password2: "High@123",
        full_name: `api_tester${nonce.getTime()}`,
    }
    let staticData = {
        full_name: "Sprint_Planner",
        email: "testuser1659082609046@mailinator.com",
    }
    let editData = {
        // national_id_back: 'https://unsplash.com/photos/SE5wx-EmRLo',
        // birth_certificate_back: 'https://unsplash.com/photos/SE5wx-EmRLo',
        // national_id_front: 'https://unsplash.com/photos/SE5wx-EmRLo',
        // birth_certificate_front: 'https://unsplash.com/photos/SE5wx-EmRLo',
        avatar: "https://www.mediawiki.org/static/images/mobile/copyright/mediawiki.svgI",
    }
    // var form = new FormData();
    // form.append("avatar", editData.avatar)   // UTILS.packFormDataWithJest(editData)
    //-------------------------------------------- test for user sign up action--------------------------------------------
    test("Sign Up User Action Test", async () => {
        let action = await rootStore.userStore.signupUser(
            testUserCredentials.full_name,
            testUserCredentials.email,
            testUserCredentials.password1,
            testUserCredentials.password2,
        )
        expect(action).toBeTrue()
        expect(rootStore.userStore.loggedInUserData.user.email).toBe(testUserCredentials.email)
        const data = await storage.getItem("access_token")
        expect(rootStore.userStore.loggedInUserData.access_token).toBe(data)
        sampleId = rootStore.userStore.loggedInUserData.user.id
    })
    //-------------------------------------------- test two for user login action--------------------------------------------
    test("Login User Action Test", async () => {
        let action = await rootStore.userStore.loginUser(staticData.email, "Hello@12345")
        expect(action).toBeTrue()
        expect(rootStore.userStore.loggedInUserData.user.email).toBe(staticData.email)
        const data = await storage.getItem("access_token")
        expect(rootStore.userStore.loggedInUserData.access_token).toBe(data)
        sampleId = rootStore.userStore.loggedInUserData.user.id
    })
    //--------------------------------------------- test for user details action---------------------------------------------
    test("Get User Action Test", async () => {
        let action = await rootStore.userStore.getLoggedInUser()
        expect(action).toBeTrue()
        expect(rootStore.userStore.userData.email).toBe(staticData.email)
    })
    //----------------------------------------- test  for Edit User Details action------------------------------------------
    test("Edit User Action Test", async () => {
        let action = await rootStore.userStore.editUser({
            gender: "Male",
        })
        expect(action).toBeTrue()
        expect(rootStore.userStore.userData.email).toBe(staticData.email)
    })
    //---------------------------------------test Resend Email Verification Action-------------------------------------------
    test("Resend Email Verification Action Test", async () => {
        let action = await rootStore.userStore.resendVerificationEmail()
        expect(action).toBeTrue()
    })
    //------------------------------------------- test Change Password Action -----------------------------------------------
    test("Change Password Action Test", async () => {
        let action = await rootStore.userStore.changePassword("Hello@12345", "Hello@12345")
        expect(action).toBeTrue()
    })
    //-------------------------------------------- test Logout Action -------------------------------------------------------
    test("Logout Action Test", async () => {
        let action = await rootStore.userStore.logoutUser()
        expect(action).toBeTrue()
    })
})
