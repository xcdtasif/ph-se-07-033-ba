import type { PropertyStatus } from "../../generated/prisma/enums.js"
import { prisma } from "../../lib/prisma.js"
import { PLACEHOLDER_IMAGE_URLS } from "../../modules/upload/upload.constants.js"
import { logCount } from "../utils/log-count.js"
import { BANNED_LANDLORD, LANDLORDS } from "./landlords.js"

type SeedProperty = {
  category: string
  name: string
  description: string
  location: string
  rent: number
  deposit: number
  // Set by the landlord; requests.ts reserves and rents properties through their requests
  status?: Extract<PropertyStatus, "UNAVAILABLE">
  // Hidden by an admin
  isHidden?: boolean
  // Owned by the banned landlord instead of one of the active ones
  bannedLandlord?: boolean
  // Owned by this landlord instead of the next one in turn
  landlord?: string
}

const DAY = 24 * 60 * 60 * 1000

// Enough to fill more than two pages of 12, with distinct rents so rent sorting has no ties
const PROPERTIES: SeedProperty[] = [
  {
    category: "Apartment",
    name: "Sunny 2-Bed Apartment in Dhanmondi",
    description:
      "Bright two-bedroom apartment with a balcony, close to the lake and public transport.",
    location: "Dhanmondi, Dhaka",
    rent: 28000,
    deposit: 56000,
  },
  {
    category: "Apartment",
    name: "Modern 3-Bed Apartment in Gulshan",
    description:
      "Spacious three-bedroom apartment with a lift, generator backup and covered parking.",
    location: "Gulshan 2, Dhaka",
    rent: 55000,
    deposit: 110000,
  },
  {
    category: "House",
    name: "Family House with Garden in Uttara",
    description: "Detached four-bedroom house with a private garden, garage and a quiet street.",
    location: "Uttara Sector 7, Dhaka",
    rent: 70000,
    deposit: 140000,
  },
  {
    category: "House",
    name: "Cozy Duplex in Bashundhara",
    description: "Two-storey duplex with three bedrooms, a rooftop terrace and 24/7 security.",
    location: "Bashundhara R/A, Dhaka",
    rent: 48000,
    deposit: 96000,
  },
  {
    category: "Studio",
    name: "Compact Studio near Banani Lake",
    description:
      "Fully furnished studio with a kitchenette and fast internet, ideal for one person.",
    location: "Banani, Dhaka",
    rent: 16000,
    deposit: 32000,
  },
  {
    category: "Studio",
    name: "Furnished Studio in Mirpur DOHS",
    description: "Neat studio flat with an attached bath, close to the metro and local markets.",
    location: "Mirpur DOHS, Dhaka",
    rent: 13000,
    deposit: 26000,
  },
  {
    category: "Commercial",
    name: "Street-Facing Shop in Motijheel",
    description:
      "Ground-floor retail space with high foot traffic, a glass front and storage room.",
    location: "Motijheel, Dhaka",
    rent: 90000,
    deposit: 270000,
  },
  {
    category: "Commercial",
    name: "Open-Plan Office in Karwan Bazar",
    description: "Air-conditioned office floor with meeting room, reception area and parking.",
    location: "Karwan Bazar, Dhaka",
    rent: 65000,
    deposit: 195000,
  },
  {
    category: "Apartment",
    name: "Lake-View 3-Bed Apartment in Baridhara",
    description:
      "Three-bedroom apartment overlooking the lake, with a gym and a children's play area.",
    location: "Baridhara, Dhaka",
    rent: 82000,
    deposit: 164000,
  },
  {
    category: "Apartment",
    name: "Budget 1-Bed Flat in Mohammadpur",
    description: "Simple one-bedroom flat on the third floor, near schools and the bus stand.",
    location: "Mohammadpur, Dhaka",
    rent: 14500,
    deposit: 29000,
  },
  {
    category: "Apartment",
    name: "Renovated 2-Bed Flat in Banasree",
    description: "Freshly painted two-bedroom flat with new fittings and gas supply.",
    location: "Banasree, Dhaka",
    rent: 21000,
    deposit: 42000,
  },
  {
    category: "Apartment",
    name: "Corner 3-Bed Apartment in Bashundhara",
    description: "Corner unit with cross ventilation, three balconies and a lift.",
    location: "Bashundhara R/A, Dhaka",
    rent: 42000,
    deposit: 84000,
  },
  {
    category: "Apartment",
    name: "High-Rise 2-Bed in Tejgaon",
    description: "Two-bedroom flat on the twelfth floor with a city view and backup power.",
    location: "Tejgaon, Dhaka",
    rent: 36000,
    deposit: 72000,
  },
  {
    category: "House",
    name: "Old Dhaka Heritage House",
    description: "Restored two-storey house with a courtyard, close to the river and markets.",
    location: "Puran Dhaka, Dhaka",
    rent: 52000,
    deposit: 104000,
  },
  {
    category: "House",
    name: "Bungalow with Lawn in Savar",
    description: "Single-storey bungalow with a large lawn, a garage and a quiet neighbourhood.",
    location: "Savar, Dhaka",
    rent: 38000,
    deposit: 76000,
  },
  {
    category: "House",
    name: "Townhouse in Aftabnagar",
    description: "Three-storey townhouse with four bedrooms and a private rooftop.",
    location: "Aftabnagar, Dhaka",
    rent: 58000,
    deposit: 116000,
  },
  {
    category: "House",
    name: "Semi-Detached House in Khilgaon",
    description: "Three-bedroom semi-detached house with a small yard and parking for one car.",
    location: "Khilgaon, Dhaka",
    rent: 34000,
    deposit: 68000,
  },
  {
    category: "Studio",
    name: "Studio Loft in Banani",
    description: "Loft-style studio with high ceilings, a work desk and fast internet.",
    location: "Banani, Dhaka",
    rent: 24000,
    deposit: 48000,
  },
  {
    category: "Studio",
    name: "Student Studio near Dhaka University",
    description: "Small furnished studio within walking distance of the campus and libraries.",
    location: "Nilkhet, Dhaka",
    rent: 11000,
    deposit: 22000,
  },
  {
    category: "Studio",
    name: "Serviced Studio in Gulshan 1",
    description: "Serviced studio with weekly cleaning, a kitchenette and 24/7 reception.",
    location: "Gulshan 1, Dhaka",
    rent: 32000,
    deposit: 64000,
  },
  {
    category: "Studio",
    name: "Rooftop Studio in Shyamoli",
    description: "Studio on the rooftop with a private terrace and plenty of daylight.",
    location: "Shyamoli, Dhaka",
    rent: 15500,
    deposit: 31000,
  },
  {
    category: "Commercial",
    name: "Corner Café Space in Dhanmondi 27",
    description: "Ground-floor corner unit with a seating area, kitchen space and street frontage.",
    location: "Dhanmondi 27, Dhaka",
    rent: 78000,
    deposit: 234000,
  },
  {
    category: "Commercial",
    name: "Warehouse in Tongi",
    description: "Warehouse with a loading bay, high ceilings and truck access.",
    location: "Tongi, Gazipur",
    rent: 60000,
    deposit: 180000,
  },
  {
    category: "Commercial",
    name: "Small Office in Paltan",
    description: "Two-room office with a reception corner, near banks and government offices.",
    location: "Paltan, Dhaka",
    rent: 27000,
    deposit: 81000,
  },
  {
    category: "Commercial",
    name: "Showroom on Pragati Sarani",
    description: "Glass-front showroom on a main road with a mezzanine and parking.",
    location: "Pragati Sarani, Dhaka",
    rent: 120000,
    deposit: 360000,
  },
  {
    category: "Commercial",
    name: "Co-Working Floor in Mirpur 10",
    description: "Open floor with desks, a meeting room and a pantry, near the metro station.",
    location: "Mirpur 10, Dhaka",
    rent: 45000,
    deposit: 135000,
  },
  {
    category: "Apartment",
    name: "Duplex Apartment in Niketan",
    description: "Two-level apartment with four bedrooms, a family lounge and two parking spaces.",
    location: "Niketan, Dhaka",
    rent: 46000,
    deposit: 92000,
  },
  {
    category: "House",
    name: "Family House in Wari",
    description: "Three-bedroom house on a quiet lane with a roof garden and a separate kitchen.",
    location: "Wari, Dhaka",
    rent: 31000,
    deposit: 62000,
  },
  {
    category: "Apartment",
    name: "Penthouse with Skyline View in Mohakhali",
    description:
      "Top-floor penthouse with a private terrace, two lifts and a dedicated parking space.",
    location: "Mohakhali DOHS, Dhaka",
    rent: 95000,
    deposit: 190000,
    isHidden: true,
  },
  {
    category: "Apartment",
    name: "Garden-Facing Flat in Lalmatia",
    description: "Quiet two-bedroom ground-floor flat with a small garden and a gated entrance.",
    location: "Lalmatia, Dhaka",
    rent: 30000,
    deposit: 60000,
    bannedLandlord: true,
  },
  /*
  Landlord 01's, so their dashboard has every status to try: rentals to complete, requests to
  approve or reject (two on one property, so approving one leaves the other unapprovable), an
  approval to reject, an unavailable listing and a hidden one
  */
  {
    category: "Apartment",
    name: "Lakeside 2-Bed Flat in Gulshan 2",
    description: "Two-bedroom flat facing Gulshan Lake, with a lift, a guard and covered parking.",
    location: "Gulshan 2, Dhaka",
    rent: 47000,
    deposit: 94000,
    landlord: "landlord01@gmail.com",
  },
  {
    category: "Apartment",
    name: "Quiet 1-Bed Flat in Banani DOHS",
    description: "One-bedroom flat on a tree-lined lane, close to the shops and the bus stop.",
    location: "Banani DOHS, Dhaka",
    rent: 25000,
    deposit: 50000,
    landlord: "landlord01@gmail.com",
  },
  {
    category: "House",
    name: "Garden Duplex in Purbachal",
    description: "Three-bedroom duplex with a front garden, a rooftop and space for two cars.",
    location: "Purbachal, Dhaka",
    rent: 44000,
    deposit: 88000,
    landlord: "landlord01@gmail.com",
  },
  {
    category: "Apartment",
    name: "Corner Flat in Rampura",
    description: "Two-bedroom corner flat with windows on two sides and a small balcony.",
    location: "Rampura, Dhaka",
    rent: 22000,
    deposit: 44000,
    landlord: "landlord01@gmail.com",
  },
  {
    category: "Apartment",
    name: "Two-Bed Flat in Kalabagan",
    description: "Two-bedroom flat near the playground, with gas, a lift and a rooftop to share.",
    location: "Kalabagan, Dhaka",
    rent: 33000,
    deposit: 66000,
    landlord: "landlord01@gmail.com",
  },
  {
    category: "Commercial",
    name: "Retail Unit on Elephant Road",
    description:
      "Ground-floor shop with a glass front on a busy shopping street, ready to fit out.",
    location: "Elephant Road, Dhaka",
    rent: 19500,
    deposit: 39000,
    status: "UNAVAILABLE",
    landlord: "landlord01@gmail.com",
  },
  {
    category: "Apartment",
    name: "Annex Flat in Shantinagar",
    description: "One-bedroom annex flat with its own entrance, above the owner's family home.",
    location: "Shantinagar, Dhaka",
    rent: 17500,
    deposit: 35000,
    isHidden: true,
    landlord: "landlord01@gmail.com",
  },
]

export const seedProperties = async () => {
  const owners = await prisma.user.findMany({
    where: {
      email: { in: [...LANDLORDS, BANNED_LANDLORD].map(({ email }) => email) },
      role: "LANDLORD",
    },
    select: { id: true, email: true },
  })
  const ownerIds = new Map(owners.map(({ id, email }) => [email, id]))

  const getOwnerId = (email: string) => {
    const id = ownerIds.get(email)

    if (!id) {
      throw new Error("Seed landlords not found, seed users first")
    }

    return id
  }

  // Properties rotate between the active landlords
  const activeLandlordIds = LANDLORDS.map(({ email }) => getOwnerId(email))
  const bannedLandlordId = getOwnerId(BANNED_LANDLORD.email)

  const categories = await prisma.category.findMany()
  const categoryIds = new Map(categories.map((category) => [category.name, category.id]))

  const existing = await prisma.property.findMany({
    where: { landlordId: { in: [...activeLandlordIds, bannedLandlordId] } },
    select: { name: true },
  })
  const existingNames = new Set(existing.map((property) => property.name))

  /*
  A day apart, so "Newest" has no ties to page through. First in the list newest, so the
  flat with the most reviews leads the default view. All listed over 60 days ago, before
  every seeded request (requests.ts goes back a day per request)
  */
  const listedAt = (property: SeedProperty) =>
    new Date(Date.now() - (60 + PROPERTIES.indexOf(property)) * DAY)

  const missing = PROPERTIES.filter((property) => !existingNames.has(property.name))

  if (missing.length === 0) {
    logCount(0, "property", "properties", "seeded")
    return
  }

  await prisma.property.createMany({
    data: missing.map(({ category, bannedLandlord, landlord, ...property }, index) => {
      const categoryId = categoryIds.get(category)

      if (!categoryId) {
        throw new Error(`Category ${category} not found, seed categories first`)
      }

      return {
        ...property,
        createdAt: listedAt(missing[index]!),
        landlordId: bannedLandlord
          ? bannedLandlordId
          : landlord
            ? getOwnerId(landlord)
            : activeLandlordIds[index % activeLandlordIds.length]!,
        categoryId,
        // Two photos, the most a property takes, so the gallery shows its thumbnails
        images: PLACEHOLDER_IMAGE_URLS,
      }
    }),
  })

  logCount(missing.length, "property", "properties", "seeded")
}
