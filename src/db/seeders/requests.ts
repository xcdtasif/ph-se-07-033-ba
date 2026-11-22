import type { RequestStatus } from "../../generated/prisma/enums.js"
import { prisma } from "../../lib/prisma.js"
import { logCount } from "../utils/log-count.js"
import { TENANTS } from "./tenants.js"

type SeedRequest = {
  tenant: string
  property: string
  status: RequestStatus
  message: string
  review?: { rating: number; comment: string; isHidden?: boolean }
}

/*
One request per status the flow can show, plus completed rentals with reviews. Tenant 01 to 03 make
the requests; Tenant 05 to 14 are earlier tenants of one flat. The properties are the ones in
properties.ts. Requests are a day apart, first in the list oldest, so lists sorted by date have no ties.
*/
const DAY = 24 * 60 * 60 * 1000

const REQUESTS: SeedRequest[] = [
  {
    tenant: "tenant01@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "Hi, I'd like to rent this flat for a year. I work nearby and can move in on the 1st.",
    review: { rating: 5, comment: "Quiet building and a very responsive landlord." },
  },
  {
    tenant: "tenant02@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message:
      "We need a place for a few months while our own flat is being renovated. Is a short lease possible?",
    review: {
      rating: 2,
      comment: "Awful experience, the landlord never answered a single message.",
      isHidden: true,
    },
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Modern 3-Bed Apartment in Gulshan",
    status: "COMPLETED",
    message: "I'm looking for a two-year lease for my family of four. Could we visit this weekend?",
    review: { rating: 4, comment: "Spacious and well kept, the generator backup is a big plus." },
  },
  // Earlier tenants of the same flat, so its reviews span several pages
  {
    tenant: "tenant05@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "Hi, I'm moving to Dhaka for work and would like a one-year lease from the 1st.",
    review: { rating: 4, comment: "Good value for the area, though the stairs are steep." },
  },
  {
    tenant: "tenant06@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "Could I rent this flat for six months? I can pay the deposit right away.",
    review: {
      rating: 5,
      comment: "The balcony catches the morning sun, and the landlord fixed things quickly.",
    },
  },
  {
    tenant: "tenant07@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "We're a couple with no children, looking for a quiet place near the lake.",
    review: { rating: 3, comment: "Fine flat, but the water pressure was low on the top floor." },
  },
  {
    tenant: "tenant08@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "I'd like to rent this from next month. Is the parking space included?",
    review: { rating: 4, comment: "Close to the lake and the bus stops, easy to get around." },
  },
  {
    tenant: "tenant09@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "Looking for a flat close to my office in Dhanmondi, can I visit on Friday?",
    review: { rating: 5, comment: "Clean, quiet and exactly as described. Would rent again." },
  },
  {
    tenant: "tenant10@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "I'm a teacher at a nearby school and need a place for the school year.",
    review: { rating: 4, comment: "Gas and electricity were reliable all year." },
  },
  {
    tenant: "tenant11@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "Interested in a long lease. Are utilities included in the rent?",
    review: { rating: 2, comment: "Street noise at night made it hard to sleep." },
  },
  {
    tenant: "tenant12@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "Hi, I'd like to move in with my brother. We both work nearby.",
    review: { rating: 4, comment: "Friendly neighbours and a guard at the gate." },
  },
  {
    tenant: "tenant13@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "Is the flat still available from the 15th? I'd like a one-year lease.",
    review: { rating: 5, comment: "Bright rooms and plenty of storage space." },
  },
  {
    tenant: "tenant14@gmail.com",
    property: "Sunny 2-Bed Apartment in Dhanmondi",
    status: "COMPLETED",
    message: "I'm looking for a two-bedroom flat for my small family. Could we visit this week?",
    review: { rating: 3, comment: "Decent place, the deposit came back a little late." },
  },
  /*
  Approved, so the property is RESERVED and the tenant can start the payment flow. Several for
  Tenant 01, so payment can be tried more than once without seeding again.
  */
  {
    tenant: "tenant01@gmail.com",
    property: "Cozy Duplex in Bashundhara",
    status: "APPROVED",
    message: "I would like to move in with my family next month. We have no pets and don't smoke.",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Semi-Detached House in Khilgaon",
    status: "APPROVED",
    message: "We're a family of four looking for a two-year lease. Is there space to park a car?",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Duplex Apartment in Niketan",
    status: "APPROVED",
    message: "I'd like to rent this duplex from the 1st. My office is a short walk from Niketan.",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Furnished Studio in Mirpur DOHS",
    status: "APPROVED",
    message: "I'm moving to Dhaka alone for work and a furnished studio would suit me well.",
  },
  {
    tenant: "tenant03@gmail.com",
    property: "Family House with Garden in Uttara",
    status: "PENDING",
    message: "Looking for a quiet house for my family, can we visit this week?",
  },
  {
    tenant: "tenant02@gmail.com",
    property: "Family House with Garden in Uttara",
    status: "CANCELLED",
    message: "Interested in a long lease. Is the garden shared with other tenants?",
  },
  {
    tenant: "tenant03@gmail.com",
    property: "Compact Studio near Banani Lake",
    status: "REJECTED",
    message: "I would like to rent this studio from next month.",
  },
  // More for Tenant 01, so their requests span three pages, with every status
  {
    tenant: "tenant01@gmail.com",
    property: "Lake-View 3-Bed Apartment in Baridhara",
    status: "PENDING",
    message: "Hi, I'd like to rent this flat from next month. Is the gym open to all tenants?",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Renovated 2-Bed Flat in Banasree",
    status: "PENDING",
    message: "Could I visit this flat on Saturday? I'm looking for a one-year lease.",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Studio Loft in Banani",
    status: "PENDING",
    message: "I work from home and the loft looks ideal. Is the internet included in the rent?",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Townhouse in Aftabnagar",
    status: "PENDING",
    message: "We're a family of five and would like a two-year lease. Is the rooftop private?",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Corner 3-Bed Apartment in Bashundhara",
    status: "ACTIVE",
    message: "I'd like to rent this flat for a year. I can pay the deposit this week.",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Showroom on Pragati Sarani",
    status: "REJECTED",
    message: "I'd like to open a furniture showroom here. Is a three-year lease possible?",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Serviced Studio in Gulshan 1",
    status: "REJECTED",
    message: "Could I rent this studio for three months while I'm on a work posting?",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Bungalow with Lawn in Savar",
    status: "CANCELLED",
    message: "Interested in renting this bungalow for my parents. Can we visit next week?",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "Budget 1-Bed Flat in Mohammadpur",
    status: "CANCELLED",
    message: "Hi, I'm a student and need a flat near my college from the 1st.",
  },
  {
    tenant: "tenant01@gmail.com",
    property: "High-Rise 2-Bed in Tejgaon",
    status: "COMPLETED",
    message: "I'd like a one-year lease, close to my office in Tejgaon.",
    review: {
      rating: 4,
      comment: "Great view and the lift always worked. A bit far from the shops.",
    },
  },
]

export const seedRequests = async () => {
  const tenants = await prisma.user.findMany({
    where: { email: { in: TENANTS.map(({ email }) => email) }, role: "TENANT" },
    select: { id: true, email: true },
  })
  const tenantIds = new Map(tenants.map(({ id, email }) => [email, id]))

  const paid = REQUESTS.filter(({ status }) => status === "ACTIVE" || status === "COMPLETED").length
  const reviewed = REQUESTS.filter(({ review }) => review).length

  const existing = await prisma.request.count({
    where: { tenantId: { in: [...tenantIds.values()] } },
  })

  if (existing > 0) {
    logCount(0, "request", "requests", "seeded")
    logCount(0, "payment", "payments", "seeded")
    logCount(0, "review", "reviews", "seeded")
    return
  }

  const properties = await prisma.property.findMany({
    where: { name: { in: REQUESTS.map(({ property }) => property) } },
  })
  const propertiesByName = new Map(properties.map((property) => [property.name, property]))

  await prisma.$transaction(async (tx) => {
    for (const [index, seedRequest] of REQUESTS.entries()) {
      const tenantId = tenantIds.get(seedRequest.tenant)
      const property = propertiesByName.get(seedRequest.property)

      if (!tenantId) {
        throw new Error(`Seed tenant ${seedRequest.tenant} not found, seed users first`)
      }

      if (!property) {
        throw new Error(`Seed property ${seedRequest.property} not found, seed properties first`)
      }

      const createdAt = new Date(Date.now() - (REQUESTS.length - index) * DAY)

      const request = await tx.request.create({
        data: {
          tenantId,
          propertyId: property.id,
          message: seedRequest.message,
          status: seedRequest.status,
          createdAt,
        },
      })

      // There's no Stripe session behind these payments, they only show a paid deposit
      if (seedRequest.status === "ACTIVE" || seedRequest.status === "COMPLETED") {
        await tx.payment.create({
          data: {
            requestId: request.id,
            stripeSessionId: `cs_test_seed_${index + 1}`,
            amount: property.deposit,
            status: "COMPLETED",
          },
        })
      }

      if (seedRequest.review) {
        await tx.review.create({
          data: {
            tenantId,
            propertyId: property.id,
            requestId: request.id,
            ...seedRequest.review,
            createdAt,
          },
        })
      }

      // As the request flow leaves them: approved reserves the property, a paid deposit rents it
      if (seedRequest.status === "APPROVED") {
        await tx.property.update({ where: { id: property.id }, data: { status: "RESERVED" } })
      }

      if (seedRequest.status === "ACTIVE") {
        await tx.property.update({ where: { id: property.id }, data: { status: "RENTED" } })
      }
    }
  })

  logCount(REQUESTS.length, "request", "requests", "seeded")
  logCount(paid, "payment", "payments", "seeded")
  logCount(reviewed, "review", "reviews", "seeded")
}
