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
        const profiles: Profile[] = await User.find(filters).populate("friends", "name email _id");
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profiles" });
    }
}

export const getProfileByID = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const profile = await User.findById(id).populate("friends", "name email _id");
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
        const profile = await User.findByIdAndUpdate(id, { $addToSet: { experience: { title, company, dates, description } } }, { new: true });
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to add experience" });
    }
}

export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
    const { id, exp } = req.params;
    try {
        const profile = await User.findByIdAndUpdate(id, { $pull: { experience: { _id: exp } } }, { new: true });
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete experience" });
    }
}

export const createSkill = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { skills } = req.body;
    try {
        const profile = await User.findByIdAndUpdate(id, { $addToSet: { skills } }, { new: true });
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to add skills" });
    }
}

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
    const { id, skill } = req.params;
    try {
        const profile = await User.findByIdAndUpdate(id, { $pull: { skills: skill } }, { new: true });
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete skill" });
    }
}

export const editProfileInformations = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { bio, location, website } = req.body;
    try {
        const profile = await User.findByIdAndUpdate(id, { $set: { "information.bio": bio, "information.location": location, "information.website": website } }, { new: true });
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Failed to update information" });
    }
}

export const getFriends = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const profile = await User.findById(id).populate("friends", "name email _id");
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        res.json(profile.friends);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch friends" });
    }
}

export const addFriend = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { friendId } = req.body;
    try {
        const profile = await User.findByIdAndUpdate(id, { $addToSet: { friends: friendId } }, { new: true }).populate("friends", "name email _id");
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        res.json(profile.friends);
    } catch (error) {
        res.status(500).json({ error: "Failed to add friend" });
    }
}

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    const { id, friendId } = req.params;
    try {
        const profile = await User.findByIdAndUpdate(id, { $pull: { friends: friendId } }, { new: true }).populate("friends", "name email _id");
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        res.json(profile.friends);
    } catch (error) {
        res.status(500).json({ error: "Failed to remove friend" });
    }
}