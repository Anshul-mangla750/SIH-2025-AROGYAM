import React from "react";
import { Heart, Moon, GraduationCap, Flame } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { WellnessCard } from "@/components/WellnessCard";
import { MoodTracker } from "@/components/MoodTracker";
import { QuickActions } from "@/components/QuickActions";
import { CommunityHighlights } from "@/components/CommunityHighlights";
import { WellnessJourney } from "@/components/WellnessJourney";
import { WellnessTip } from "@/components/WellnessTip";
import { EmergencySupport } from "@/components/EmergencySupport";
import { UpcomingAppointments } from "@/components/UpcomingAppointments";
import { LatestResources } from "@/components/LatestResources";
import axios from "axios";
import { useState, useEffect } from "react";
import Mood from "./Mood";
import api from "@/config/api";

const wellnessData = [
	{
		title: "Mood Today",
		subtitle: "Good - Keep it up!",
		icon: Heart,
		iconBgColor: "bg-wellness-green",
		progress: 85,
		progressColor: "green",
		emoji: "💚",
	},
	{
		title: "Sleep Quality",
		subtitle: "7.5 hours last night",
		icon: Moon,
		iconBgColor: "bg-wellness-blue",
		progress: 75,
		progressColor: "blue",
		emoji: "🌙",
	},
	{
		title: "Study Stress",
		subtitle: "Moderate level",
		icon: GraduationCap,
		iconBgColor: "bg-wellness-orange",
		progress: 60,
		progressColor: "orange",
		emoji: "🎓",
	},
	{
		title: "Streak",
		subtitle: "12 days checking in",
		icon: Flame,
		iconBgColor: "bg-wellness-yellow",
		progress: 100,
		progressColor: "yellow",
		emoji: "🔥",
	},
];

export default function Dashboard() {
	const [user, setUser] = useState(null);
const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // If no token, redirect to login or show an error
    if (!token) {
      setError("No token found, please log in again.");
      window.location.href = "/login"; // Redirect to login page if token is missing
      return;
    }

    console.log("Using token:", token);

    // Make the API request to fetch the current user
    api
      .get("/protected", {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      })
      .then((response) => {
        console.log("Fetched user:", response.data.user);
        setUser(response.data.user); // Set the user state on success
      })
      .catch((error) => {
        console.error("Error fetching user:", error);

        // Handle specific error types (like token expiry or invalid token)
        if (error.response && error.response.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token"); // Remove expired token from localStorage
          window.location.href = "/login"; // Redirect to login page
        } else {
          setError("Error fetching user. Please try again.");
        }
      });
  }, []);

	return (
		<div className="min-h-screen bg-background">
			<main className="container mx-auto px-6 py-8 max-w-7xl">
				{/* Hero Section */}
				<HeroSection userName={user?.username || "User"} />

				{/* Wellness Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{wellnessData.map((data, index) => (
						<WellnessCard
							key={data.title}
							title={data.title}
							subtitle={data.subtitle}
							icon={data.icon}
							iconBgColor={data.iconBgColor}
							progress={data.progress}
							progressColor={data.progressColor}
							emoji={data.emoji}
						/>
					))}
				</div>

				{/* Main Content Grid */}
				{/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          Left Column - Mood Tracker
          <div className="lg:col-span-1">
            <MoodTracker />
          </div>
          
          Right Columns - Community & Journey
          <div className="lg:col-span-2 space-y-8">
            <CommunityHighlights />
            <WellnessJourney />
          </div>
        </div> */}

				{/* <div className="mb-8">
          <MoodTracker />
         </div> */}

				{/* Upcoming Appointments */}
				<div className="mb-8">
					<UpcomingAppointments />
				</div>

				{/* Quick Actions */}
				<div className="mb-8">
					<QuickActions />
				</div>

				{/* Latest Resources */}
				<div className="mb-8">
					<LatestResources />
				</div>

				{/* Community Highlights */}
				<div className="mb-8">
					<CommunityHighlights />
				</div>

				{/* Wellness Tip */}
				<div className="mb-8">
					<WellnessTip />
				</div>

				{/* Wellness Journey */}
				<div className="mb-8">
					<WellnessJourney />
				</div>

				{/* Emergency Support */}
				<div>
					<EmergencySupport />
				</div>
			</main>
		</div>
	);
}
