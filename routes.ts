import { Router } from "express";
import * as controller from './api/profiles/controller';

export const router = Router();

router.get('/profiles', controller.getProfiles);

router.get('/profiles/:id', controller.getProfileByID);

router.post('/profiles', controller.createProfile);

router.delete('/profiles/:id', controller.deleteProfile);

router.put('/profiles/:id', controller.updateProfile);

router.post('/profiles/:id/experience', controller.createExperience);

router.delete('/profiles/:id/experience/:exp', controller.deleteExperience);

router.post('/profiles/:id/skills', controller.createSkill);

router.delete('/profiles/:id/skills/:skill', controller.deleteSkill);

router.put('/profiles/:id/information', controller.editProfileInformations);