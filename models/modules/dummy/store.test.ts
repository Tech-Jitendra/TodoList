import { RootStore, setupRootStore } from "../../"
import { i18nJSON } from "../i18n/schema"

describe("Store Tests", () => {
    let rootStore: RootStore = null
    beforeAll(async () => {
        rootStore = await setupRootStore()
        return rootStore
    })
    let sampleId = null
    test("Get dummies paginated", async () => {
        let action = await rootStore.dummyStore.getDummiesPaginated()
        expect(action).toBeTrue()
        expect(rootStore.dummyStore.dummyPaginated.results.length).toBePositive()
        sampleId = rootStore.dummyStore.dummyPaginated.results[0].id
    })
    test("Get selected dummy by id", async () => {
        let action = await rootStore.dummyStore.getDummy(sampleId)
        expect(action).toBeTrue()
        expect(rootStore.dummyStore.selectedDummy.id).toBe(sampleId)
    })
    test("Create dummy", async () => {
        let testData = {
            message: "Hello!",
            multiLanguageMessage: <i18nJSON>{
                en: "Hello there",
                ar: "أهلاً بك",
            },
        }
        let action = await rootStore.dummyStore.createDummy(testData)
        expect(action).toBeTrue()
        expect(rootStore.dummyStore.selectedDummy.message).toBe(testData.message)
        expect(rootStore.dummyStore.selectedDummy.multiLanguageMessage).toStrictEqual(
            testData.multiLanguageMessage,
        )
        sampleId = rootStore.dummyStore.selectedDummy.id
    })
    test("Edit dummy", async () => {
        let testData = {
            message: "Wazzup",
        }
        let action = await rootStore.dummyStore.editDummy(sampleId, testData)
        expect(action).toBeTrue()
        expect(rootStore.dummyStore.selectedDummy.id).toBe(sampleId)
        expect(rootStore.dummyStore.selectedDummy.message).toBe(testData.message)
    })
    test("Delete dummy", async () => {
        let action = await rootStore.dummyStore.deleteDummy(sampleId)
        expect(action).toBeTrue()
    })
})
