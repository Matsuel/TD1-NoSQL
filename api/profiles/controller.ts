import type { Profile } from "../types";
import { User } from "./model";
import { type Request, type Response } from "express";

export const getProfiles = async (req: Request, res: Response): Promise<void> => {
    const { location, skill, website } = req.query;

    const filters: Record<string, any> = {};
    if (location) filters["information.location"] = location;
    if (website) filters["information.website"] = website;
    if (skill) filters.skills = { $in: [skill] };

    try {
        const profiles: Profile[] = await User.find(filters);
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profiles" });
    }
}

export const getProfileByID = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const profile = await User.findById(id);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}

export const createProfile = async (req: Request, res: Response): Promise<void> => {
    const { name, email } = req.body;
    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create profile" });
    }
}

export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ message: "Profile deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete profile" });
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedProfile = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        res.json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: "Failed to update profile" });
    }
}

export const createExperience = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, company, dates, description } = req.body;
    try {
        const profile = await User.findById(id);
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        profile.experience.push({ title, company, dates, description });
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to add experience" });
    }
}

export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
    const { id, exp } = req.params;
    try {
        const profile = await User.findById(id);
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        const experienceToDelete = profile.experience.id(exp);
        if (!experienceToDelete) {
            res.status(404).json({ error: "Experience not found" });
            return;
        }
        experienceToDelete.deleteOne();
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete experience" });
    }
}

export const createSkill = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { skills } = req.body;
    try {
        const profile = await User.findById(id);
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        if (profile.skills.indexOf(skills) !== -1) {
            res.status(400).json({ error: "Skill already exists" });
            return;
        }
        profile.skills.push(skills);
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to add skills" });
    }
}

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
    const { id, skill } = req.params;
    try {
        const profile = await User.findById(id);
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        const skillToDelete = profile.skills.indexOf(skill);
        if (skillToDelete === -1) {
            res.status(404).json({ error: "Skill not found" });
            return;
        }
        profile.skills.splice(skillToDelete, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete skill" });
    }
}

export const editProfileInformations = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { bio, location, website } = req.body;
    try {
        const profile = await User.findById(id);
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        profile.information.bio = bio;
        profile.information.location = location;
        profile.information.website = website;
        await profile.save();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to update information" });
    }
}