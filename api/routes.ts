import { Router } from "express";
import { createExperience, createProfile, createSkill, deleteExperience, deleteProfile, deleteSkill, editProfileInformations, getProfileByID, getProfiles, updateProfile } from '../api/profiles/controller';

export const router = Router();

router.get('/profiles', getProfiles);

router.get('/profiles/:id', getProfileByID);

router.post('/profiles', createProfile);

router.delete('/profiles/:id', deleteProfile);

router.put('/profiles/:id', updateProfile);

router.post('/profiles/:id/experience', createExperience);

router.delete('/profiles/:id/experience/:exp', deleteExperience);

router.post('/profiles/:id/skills', createSkill);

router.delete('/profiles/:id/skills/:skill', deleteSkill);

router.put('/profiles/:id/information', editProfileInformations);