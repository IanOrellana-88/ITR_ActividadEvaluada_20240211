import express from 'express';
import cookieParser from 'cookie-parser';
import loginTeachersRoutes from './src/routes/loginTeachers.js';
import logoutTeachersRoutes from './src/routes/logoutTeachers.js';
import registerTeachersRoutes from './src/routes/registerTeachers.js';
import teachersRoutes from './src/routes/teachers.js';
import tuitionRoutes from './src/routes/tuition.js';
import subjectsRoutes from './src/routes/subjects.js';
import specialitiesRoutes from './src/routes/specialities.js';
import loginStudentsRoutes from './src/routes/loginStudents.js';
import registerStudentsRoutes from './src/routes/registerStudents.js';

import cors  from 'cors';
const app = express();

app.use (
    cors ({
        origin : ["http://localhost:5173", "http://localhost:5174"],
        credentials : true,
    }),
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/teachers/login', loginTeachersRoutes);
app.use('/api/teachers/logout', logoutTeachersRoutes);
app.use('/api/teachers/register', registerTeachersRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/students/login', loginStudentsRoutes);
app.use('/api/students/register', registerStudentsRoutes);
app.use('/api/tuition', tuitionRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/specialities', specialitiesRoutes);

export default app;