import prisma from "../src/lib/prisma";

async function main() {
  console.log("🌱 Starting Pitraya Database Seeding to Neon PostgreSQL...");

  // 1. SEED ALL 5 EXPERIENCE PACKAGES
  const packagesData = [
    {
      id: "sacred-experience",
      title: "Sacred Experience",
      startingPrice: 5100,
      duration: "1 Day / Same Day Rites",
      description: "Essential Pinda Daan oblation rites at Vishnupad Sanctum Ghats.",
    },
    {
      id: "heritage-experience",
      title: "Heritage Experience",
      startingPrice: 24999,
      duration: "2 Days / 1 Night",
      description: "Comprehensive Gaya oblation rites with 3-star Sattvik hotel & private chauffeur transfer.",
    },
    {
      id: "moksha-journey",
      title: "Moksha Journey",
      startingPrice: 49999,
      duration: "3 Days / 2 Nights",
      description: "Complete 3-Vedi Pinda Daan pilgrimage including Vishnupad, Phalgu River, & Akshay Vat.",
    },
    {
      id: "royal-concierge",
      title: "Royal Concierge",
      startingPrice: 89999,
      duration: "3 Days / 2 Nights",
      description: "Luxury VIP pilgrimage with luxury 4-star suite, dedicated Gayawal Purohit & Innova Crysta.",
    },
    {
      id: "legacy-experience",
      title: "Legacy Experience",
      startingPrice: 150000,
      duration: "4 Days / 3 Nights",
      description: "Ultra-luxury family legacy pilgrimage with ancestral lineage Panji genealogy registration.",
    },
  ];

  for (const pkg of packagesData) {
    await prisma.package.upsert({
      where: { id: pkg.id },
      update: pkg,
      create: pkg,
    });
    console.log(`   ✅ Seeded Package: ${pkg.title} - ₹${pkg.startingPrice.toLocaleString("en-IN")}`);
  }

  // 2. SEED HOTELS
  const hotelsData = [
    {
      id: "hot-regency",
      name: "Bodhgaya Regency Heritage Suite",
      starRating: 4,
      address: "Main Temple Road, Bodhgaya, Bihar 824231",
      googleMapsUrl: "https://maps.google.com/?q=Bodhgaya+Regency",
      checkInTime: "12:00 PM",
    },
    {
      id: "hot-gaya-grand",
      name: "Gaya Grand Sattvik Resort",
      starRating: 4,
      address: "Station Road, Gaya, Bihar 823001",
      googleMapsUrl: "https://maps.google.com/?q=Gaya+Grand",
      checkInTime: "01:00 PM",
    },
  ];

  for (const hotel of hotelsData) {
    await prisma.hotel.upsert({
      where: { id: hotel.id },
      update: hotel,
      create: hotel,
    });
    console.log(`   ✅ Seeded Hotel: ${hotel.name}`);
  }

  // 3. SEED VEHICLES
  const vehiclesData = [
    {
      id: "veh-innova",
      name: "Innova Crysta AC",
      driverName: "Chauffeur Ramesh",
      driverPhone: "+91 99887 76655",
      vehicleNumber: "BR-02-PA-8841",
    },
    {
      id: "veh-tempo",
      name: "Executive Tempo Traveller",
      driverName: "Chauffeur Suresh",
      driverPhone: "+91 98765 12345",
      vehicleNumber: "BR-02-TT-9912",
    },
  ];

  for (const v of vehiclesData) {
    await prisma.vehicle.upsert({
      where: { id: v.id },
      update: v,
      create: v,
    });
    console.log(`   ✅ Seeded Vehicle: ${v.name}`);
  }

  // 4. SEED PANDITS
  const panditsData = [
    {
      id: "pandit-mishra",
      name: "Pandit Rajesh Mishra Ji",
      phone: "+91 98350 12345",
      title: "Senior Gayawal Purohit",
      sanctumSpecialty: "Vishnupad Footprint Pinda Daan",
    },
    {
      id: "pandit-shastri",
      name: "Acharya S. K. Shastri Ji",
      phone: "+91 94312 67890",
      title: "Vishnupad Sanctum Head",
      sanctumSpecialty: "Gayawal Panji Family Lineage Record",
    },
  ];

  for (const p of panditsData) {
    await prisma.pandit.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
    console.log(`   ✅ Seeded Pandit: ${p.name}`);
  }

  // 5. SEED COORDINATORS
  const coordinatorsData = [
    { id: "coord-rahul", name: "Rahul Sharma", phone: "+91 84344 57228", role: "Lead Concierge Manager" },
    { id: "coord-anand", name: "Anand Verma", phone: "+91 70000 88888", role: "Logistics Escort" },
  ];

  for (const c of coordinatorsData) {
    await prisma.coordinator.upsert({
      where: { id: c.id },
      update: c,
      create: c,
    });
    console.log(`   ✅ Seeded Coordinator: ${c.name}`);
  }

  // 6. SEED ADMIN USERS FOR RBAC
  const bcrypt = await import("bcryptjs");
  const superAdminPassword = await bcrypt.hash("SuperAdmin123!", 10);
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const coordinatorPassword = await bcrypt.hash("Coordinator123!", 10);
  const operatorPassword = await bcrypt.hash("Operator123!", 10);

  const usersData = [
    {
      id: "usr-super-admin",
      name: "Master Super Admin",
      email: "superadmin@rituals.com",
      password: superAdminPassword,
      role: "SUPER_ADMIN" as const,
    },
    {
      id: "usr-admin",
      name: "Operations Admin",
      email: "admin@rituals.com",
      password: adminPassword,
      role: "ADMIN" as const,
    },
    {
      id: "usr-coordinator",
      name: "Rahul Sharma (Coordinator)",
      email: "coordinator@rituals.com",
      password: coordinatorPassword,
      role: "COORDINATOR" as const,
      coordinatorId: "coord-rahul",
    },
    {
      id: "usr-operator",
      name: "System Operator",
      email: "operator@rituals.com",
      password: operatorPassword,
      role: "OPERATOR" as const,
    },
  ];

  for (const u of usersData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        password: u.password,
        role: u.role,
        coordinatorId: u.coordinatorId || null,
      },
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role,
        coordinatorId: u.coordinatorId || null,
      },
    });
    console.log(`   🔑 Seeded User: ${u.email} [${u.role}]`);
  }

  console.log("\n✨ Database Seeding to Neon PostgreSQL Complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
