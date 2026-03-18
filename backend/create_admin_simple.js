const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// URI extraída del .env del backend
const uri = "mongodb+srv://aletiscornia96_db_user:Q6MTP7hEi1dT9dMD@vasen-db.cxu6b7v.mongodb.net/?appName=VASEN-DB";

async function run() {
  try {
    console.log("Conectando a MongoDB Atlas...");
    await mongoose.connect(uri);
    console.log("Conexión exitosa.");

    // Definición minimalista del esquema para evitar dependencias complejas de NestJS
    const UserSchema = new mongoose.Schema({
      email: { type: String, unique: true },
      passwordHash: String,
      role: String,
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
    });

    // Forzar el nombre de la colección a 'users' (minúscula usualmente en Mongoose)
    const User = mongoose.model('User', UserSchema, 'users');

    const plainPassword = 'vasen2026';
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    
    const adminEmail = 'admin@vasen.com';
    
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      existing.passwordHash = passwordHash;
      existing.role = 'ADMIN';
      await existing.save();
      console.log(`El usuario administrador (${adminEmail}) ya existía. Se ha actualizado su contraseña a: ${plainPassword}`);
    } else {
      await User.create({
        email: adminEmail,
        passwordHash,
        role: 'ADMIN'
      });
      console.log(`Usuario administrador (${adminEmail}) creado exitosamente con contraseña: ${plainPassword}`);
    }

    // Verificar otras colecciones
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Colecciones encontradas:", collections.map(c => c.name));

    for (const coll of collections) {
      const count = await mongoose.connection.db.collection(coll.name).countDocuments();
      console.log(`- ${coll.name}: ${count} documentos`);
    }

  } catch (err) {
    console.error("Error durante la creación del admin:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado.");
  }
}

run();
