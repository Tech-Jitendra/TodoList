import { API_ENDPOINTS } from "./endpoints"
import { RootStore, setupRootStore } from "../../"
import { BASE_MODEL_TEST, PAGINATION_TEST } from "../../api/endpoint.test.types"
import { ORDERING_FILTER, PAGINATION_FILTERS, UTILS } from "../../api/endpoint.types"

describe("Consumer Integration Tests", () => {
    let rootStore: RootStore = null
    beforeAll(async () => {
        rootStore = await setupRootStore()
        return rootStore
    })
    let sampleId = ""
    test("Get Dummies Paginated", async () => {
        const res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.getDummies)
        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject(PAGINATION_TEST)
        res.data.results.map((result) => {
            expect(result).toMatchObject({
                ...BASE_MODEL_TEST,
                message: expect.any(String),
            })
        })
        sampleId = res.data.results[0].id
    })
    test("Get Dummy by ID", async () => {
        const res = await rootStore.userStore.environment.api.call(
            API_ENDPOINTS.getDummy,
            {},
            {
                id: sampleId,
            },
            {
                customHeader: "customHeader",
            },
        )
        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject({
            ...BASE_MODEL_TEST,
            message: expect.any(String),
        })
    })
    let createdDummyId = null
    test("Create Dummy", async () => {
        const res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.createDummy, {
            message: "Hello there!",
        })
        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject({
            ...BASE_MODEL_TEST,
            message: expect.any(String),
        })
        createdDummyId = res.data.id
    })
    test("Edit Dummy by ID", async () => {
        const res = await rootStore.userStore.environment.api.call(
            API_ENDPOINTS.editDummy,
            {
                message: "Hello there again!",
            },
            {
                id: createdDummyId,
            },
        )
        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject({
            ...BASE_MODEL_TEST,
            message: expect.any(String),
        })
        createdDummyId = res.data.id
    })
    test("Delete Dummy by ID", async () => {
        const res = await rootStore.userStore.environment.api.call(
            API_ENDPOINTS.deleteDummy,
            {},
            {
                id: createdDummyId,
            },
        )
        expect(res.ok).toBe(true)
    })
    test("page size and next page test", async () => {
        //set page size to 2 to get 2 items
        let res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.getDummies, {
            [PAGINATION_FILTERS.PAGE_SIZE]: 2,
            [PAGINATION_FILTERS.PAGE_NUMBER]: 1,
            [ORDERING_FILTER]: "id",
        })
        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject(PAGINATION_TEST)
        expect(res.data.previous).toBe(null)
        //save those ids to compare later
        let firstPageItemId = res.data.results[0].id
        let secondPageItemId = res.data.results[1].id
        //fetch page 1 with only 1 item
        res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.getDummies, {
            [PAGINATION_FILTERS.PAGE_SIZE]: 1,
            [PAGINATION_FILTERS.PAGE_NUMBER]: 1,
            [ORDERING_FILTER]: "id",
        })

        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject(PAGINATION_TEST)
        expect(res.data.results[0].id).toBe(firstPageItemId)
        expect(UTILS.getPageNumber(res.data.next)).toBe(2)
        //fetch page 2 with only 1 item
        res = await rootStore.userStore.environment.api.call(API_ENDPOINTS.getDummies, {
            [PAGINATION_FILTERS.PAGE_SIZE]: 1,
            [PAGINATION_FILTERS.PAGE_NUMBER]: 2,
            [ORDERING_FILTER]: "id",
        })

        expect(res.ok).toBe(true)
        expect(res.data).toMatchObject(PAGINATION_TEST)
        expect(res.data.results[0].id).toBe(secondPageItemId)
        expect(UTILS.getPageNumber(res.data.previous)).toBe(1)
    })
})

//-----------------------------------
