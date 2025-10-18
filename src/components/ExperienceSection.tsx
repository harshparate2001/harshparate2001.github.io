import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

export default function ExperienceSection() {
  return (
      <section
          id="experience"
          className="py-12 bg-gradient-to-b from-muted/20 to-background"
      >
        <div className="container max-w-4xl mx-auto px-6 md:px-4">
          <MotionWrapper>
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left flex items-center md:inline-block">
              <motion.span
                  className="inline-block mr-2"
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
              >
                💼
              </motion.span>{" "}
              Work Experience
            </h2>
          </MotionWrapper>
          <div className="mb-8">
            {workExperience.map((job, index) => {
              // Extract URL and clean company name
              const urlMatch = job.company.match(/\((https?:\/\/[^\s)]+)\)/);
              const companyUrl = urlMatch ? urlMatch[1] : "#";
              const companyName = job.company.replace(/\s*\(https?:\/\/[^\s)]+\)/, "").trim();

              return (
                  <TimelineItem
                      key={job.company + job.period}
                      title={
                        <>
                          👨‍💻 {job.position} |{" "}
                          <a
                              href={companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-500 underline"
                          >
                            {companyName}
                          </a>
                        </>
                      }
                      subtitle={`🌍 ${job.location}`}
                      date={`📅 ${job.period}`}
                      isLast={index === workExperience.length - 1}
                      index={index}
                  >
                    <motion.div
                        className="mt-3 p-4 bg-background/80 backdrop-blur-sm backdrop-filter rounded-lg border border-purple-500/20 dark:bg-card/10 dark:border-purple-500/10 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                      <div className="flex items-center mb-3">
                        <div className="h-6 w-6 flex items-center justify-center rounded-full bg-purple-500/10 mr-2">
                          <Briefcase className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="text-sm font-medium">Key Achievements</h4>
                      </div>
                      <ul className="ml-6 text-sm">
                        {job.achievements.map((achievement, i) => {
                          const isNewline = achievement === "\n";
                          const isBold = achievement === "Key Responsibilities & Achievements:";
                          const removeBullet = isNewline || isBold;

                          return (
                              <motion.li
                                  key={i}
                                  className={`${
                                      removeBullet ? "list-none" : "list-disc"
                                  } ${isNewline ? "mt-2" : ""} ${isBold ? "mt-4 text-sm font-medium" : ""}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.1 * i }}
                                  viewport={{ once: true }}
                              >
                                {!isNewline && achievement}
                              </motion.li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  </TimelineItem>
              );
            })}
          </div>
        </div>
      </section>
  );
}
