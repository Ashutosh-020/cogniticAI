import {
  Bot,
  Calendar,
  Mail,
  MessageSquare,
  Share2,
  Slack,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Meeting Intelligence",
    description:
      "Automatically generate structured summaries, key decisions, and actionable insights from every meeting",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Calendar,
    title: "Autonomous Calendar Sync",
    description:
      "Seamlessly connect Google Calendar and deploy bots that auto-join scheduled meetings in real-time",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Mail,
    title: "Post-Meeting Intelligence Reports",
    description:
      "Receive beautifully formatted email reports with summaries, highlights, and assigned action items",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: MessageSquare,
    title: "Conversational Meeting AI",
    description:
      "Interact with your meetings using natural language powered by a RAG pipeline and semantic search",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Share2,
    title: "Workflow Automation Integrations",
    description:
      "Instantly sync action items with Slack, Asana, Jira, and Trello to streamline team execution",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Slack,
    title: "Native Slack Assistant",
    description:
      "Use the Cognitic Slack bot to query meetings, retrieve insights, and collaborate without leaving Slack",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need for{" "}
            <span className="bg-linear-to-r from-blue-400 via-blue-500 to-blue-600  bg-clip-text text-transparent">
              Smarter Meetings
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto bg-linear-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(156,163,175,0.3)]">
            From AI summaries to seamless integrations, we've got every aspect
            covered.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 hover:border-gray-700 transition-all"
            >
              <div
                className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
