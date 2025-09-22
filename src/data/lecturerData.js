import thumb1 from "../../assets/hawc-images/01.png";
import thumb2 from "../../assets/hawc-images/02.png";
import thumb3 from "../../assets/hawc-images/03.png";
import thumb4 from "../../assets/hawc-images/04.png";

export const lecturerCoursesData = [
  {
    id: "upcoming1",
    status: "upcoming",
    subject: "Maths",
    title: "Differential Calculus",
    description:
      "Explore derivatives, rates of change, and applications in real-world problems. Perfect for advanced learners.",
    tags: ["Mathematics", "Calculus", "Differentiation"],
    date: "Dec 26, 2024",
    time: "10:00 AM",
    thumbnail: thumb1,
  },
  {
    id: "live1",
    status: "live",
    subject: "Physics",
    title: "Quantum Mechanics Live",
    description:
      "Join the live session on the fundamental concepts of quantum mechanics, including wave-particle duality.",
    tags: ["Physics", "Quantum", "Live Session"],
    date: "Dec 20, 2024",
    time: "11:30 AM",
    thumbnail: thumb2,
  },
  {
    id: "recorded1",
    status: "recorded",
    subject: "Chemistry",
    title: "Advanced Integration Techniques",
    description:
      "Deep dive into advanced integration techniques and their applications in solving complex problems.",
    tags: ["Chemistry", "Calculus", "Integration"],
    date: "Dec 20, 2024",
    duration: "2h 15m",
    viewers: 245,
    thumbnail: thumb3,
  },
  {
    id: "recorded2",
    status: "recorded",
    subject: "Biology",
    title: "Genetics and Heredity",
    description:
      "An in-depth look at Mendelian genetics, DNA structure, and patterns of inheritance.",
    tags: ["Biology", "Genetics", "Heredity"],
    date: "Dec 18, 2024",
    duration: "1h 45m",
    viewers: 312,
    thumbnail: thumb4,
  },
];
