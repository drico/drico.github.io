import Image from "next/image";
import Icon from "./Icon";
import { map, times, join } from "lodash";
import { ReactNode } from "react";

const { differenceInYears } = require("date-fns");

const IMAGE_SIZE = 100;

const StarList = ({ star, list }: { star: number; list: string[] }) => {
  const startString =
    join(
      times(star, () => "★"),
      ""
    ) +
    join(
      times(5 - star, () => "☆"),
      ""
    );
  return (
    <div className=" mb-2">
      <div>{startString} :</div>
      <div> {join(list, " • ")}</div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="mb-5">
      <div className="font-headers text-center font-bold text-base mb-3">
        {title}
      </div>
      {children}
    </div>
  );
};

const LeftBanner = () => {
  return (
    <div className="w-[400px] min-h-screen bg-dark text-white text-sm">
      <div className="bg-darkest w-full flex flex-col items-center gap-2 font-headers p-5">
        <div className="rounded-full bg-dark p-1 w-fit">
          <Image
            className="rounded-full"
            src="/myFace.jpg"
            alt="My face"
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            priority
          />
        </div>
        <div className="m-2 font-bold text-base">AUDRIC DEBLADIS</div>
        <div className="-m-2 font-bold">Ingénieur Développeur Sénior</div>
        <div className="font-bold">Full Stack</div>
        <div>{differenceInYears(new Date(), Date.parse("07/26/1987"))} ans</div>
      </div>
      <div className="p-5">
        <Section title="CONTACT">
          {map(
            [
              {
                icon: "alternate_email",
                label: "audric.debladis@gmail.com",
                href: "mailto:audric.debladis@gmail.com",
              },
              {
                icon: "call",
                label: "(+33)06-77-73-34-65",
                href: "tel:+330677733465",
              },
              {
                icon: "handshake",
                label: "Profil Malt",
                href: "https://www.malt.fr/profile/audricdebladis",
              },
            ],
            ({ icon, label, href }) => (
              <div className="flex items-center" key={href}>
                <Icon name={icon} className="m-1" />
                <a href={href}>{label}</a>
              </div>
            )
          )}
        </Section>

        <Section title="COMPÉTENCES">
          <StarList
            star={5}
            list={[
              "NodeJS",
              "Express",
              "Lodash",
              "TypeScript",
              "PostgreSQL",
              "SQL",
            ]}
          />

          <StarList
            star={4}
            list={[
              "React",
              "NextJS",
              "Graphql",
              "ElasticSearch",
              "Material-UI",
              "TailwindCSS",
              "Github",
              "iOS",
              "Objective-C",
              "AWS : Redshift",
              "CloudFront",
              "Lambda",
              "S3",
              "SQS",
              "SNS",
              "Kinesis",
            ]}
          />

          <StarList
            star={3}
            list={["Heroku", "Chatbot Facebook ", "Python", "Facebook"]}
          />

          <StarList star={2} list={["Ruby", "Rails", "Java"]} />
        </Section>

        <Section title="LANGUES">
          {map(
            [
              {
                icon: "/france.png",
                label: "Français",
                description: "★★★★★ langue maternelle",
              },
              {
                icon: "/uk.png",
                label: "Anglais",
                description: "★★★★☆ courant",
              },
              {
                icon: "/france.png",
                label: "Langue des Signes (LSF)",
                description: "★★☆☆☆ notions",
              },
            ],
            ({ icon, label, description }) => (
              <div className="flex items-center gap-3 m-2">
                <Image
                  className="rounded-full"
                  src={icon}
                  alt="flag"
                  width={24}
                  height={24}
                  priority
                />
                <div>
                  <div>{label}</div>
                  <div>{description}</div>
                </div>
              </div>
            )
          )}
        </Section>

        <Section title="LOISIRS">
          <div className="grid grid-cols-2">
            {map(
              [
                { icon: "music_note", label: "Flûte" },
                { icon: "music_note", label: "Guitare" },
                { icon: "cooking", label: "Cuisine" },
                { icon: "stadia_controller", label: "Jeux vidéos" },
              ],
              ({ icon, label }) => (
                <div className="flex items-center">
                  <Icon name={icon} className="m-1" />
                  <div>{label}</div>
                </div>
              )
            )}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default LeftBanner;
