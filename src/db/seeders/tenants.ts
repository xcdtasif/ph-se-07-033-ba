import { seedUsersWithRole } from "../utils/seed-users.js"

export const TENANTS = [
  { name: "Tenant 01", email: "tenant01@gmail.com" },
  { name: "Tenant 02", email: "tenant02@gmail.com" },
  { name: "Tenant 03", email: "tenant03@gmail.com" },
  // Past tenants of one flat, so its reviews fill more than one page
  { name: "Tenant 05", email: "tenant05@gmail.com" },
  { name: "Tenant 06", email: "tenant06@gmail.com" },
  { name: "Tenant 07", email: "tenant07@gmail.com" },
  { name: "Tenant 08", email: "tenant08@gmail.com" },
  { name: "Tenant 09", email: "tenant09@gmail.com" },
  { name: "Tenant 10", email: "tenant10@gmail.com" },
  { name: "Tenant 11", email: "tenant11@gmail.com" },
  { name: "Tenant 12", email: "tenant12@gmail.com" },
  { name: "Tenant 13", email: "tenant13@gmail.com" },
  { name: "Tenant 14", email: "tenant14@gmail.com" },
]

const BANNED_TENANT = { name: "Tenant 04", email: "tenant04@gmail.com", isBanned: true }

export const seedTenants = () =>
  seedUsersWithRole([...TENANTS, BANNED_TENANT], "TENANT", "tenant", "tenants")
