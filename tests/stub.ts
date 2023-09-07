import { faker } from 'npm:@faker-js/faker';
import type { Models } from 'https://deno.land/x/appwrite@8.0.0/src/models.d.ts'

export interface Request {
    bodyRaw: string
    body: object|string
    scheme: string
    method: string
    url: string
    host: string
    port: number
    path: string
    queryString: string
    query: object
}

export interface Response {
    empty(): string
    json(response: object, status: number): string
    redirect(url: string, status: number): string
    send(text: string, status: number): string
}

export interface Context {
    req: Request
    res: Response
    log: (_message: string) => null
    error: (_message: string) => null
}

export function generateDocumentStub(): Models.Document {
    return {
        $id: faker.string.uuid(),
        $collectionId: faker.string.uuid(),
        $databaseId: faker.string.uuid(),
        $createdAt: faker.date.recent().toISOString(),
        $updatedAt: faker.date.recent().toISOString(),
        $permissions: []
    }
}

export function generateDocumentListStub(max = 10): Models.DocumentList<Models.Document> {
    const total = faker.number.int({ min: 2, max })
    const documents: Array<Models.Document> = []
    for (let x = 1; x <= total; x++ ) {
        documents.push({
            $id: faker.string.uuid(),
            $collectionId: faker.string.uuid(),
            $databaseId: faker.string.uuid(),
            $createdAt: faker.date.recent().toISOString(),
            $updatedAt: faker.date.recent().toISOString(),
            $permissions: []
        })
    }
    return { total, documents }
}

export function generateContextStub(): Context {
    const body = { name: faker.person.firstName(), phone: faker.phone.number(), job: faker.person.jobTitle() }
    const param = faker.word.words()
    return {
        req: {
            bodyRaw: JSON.stringify(body),
            body,
            scheme: faker.internet.protocol(),
            method: faker.internet.httpMethod(),
            url: faker.internet.url(),
            host: faker.internet.domainName(),
            port: faker.internet.port(),
            path: '/' + faker.word.words(),
            queryString: `param=${param}`,
            query: { param }
        },
        res: {
            empty(): string {
                return ''
            },

            json(response: object, _status: number): string {
                return JSON.stringify(response)
            },

            redirect(url: string, _status: number): string {
                return url
            },

            send(text: string, _status: number): string {
                return text
            }
        },
        log: (_message: string) => null,
        error: (_message: string) => null
    }
}
