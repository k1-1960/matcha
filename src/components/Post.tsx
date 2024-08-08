import PostType from "../types/Post";
import moment from "moment";

const momento = (date: Date) => {
    let time = new Date().getTime() - new Date(date).getTime();
    let time2sec = time / 1000;
    console.log(time2sec);

    let measurements = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    while (time2sec >= 1) {
        if (time2sec >= 365 * 24 * 60 * 60) {
            time2sec -= 365 * 24 * 60 * 60;
            measurements.years += 1;
        } else if (time2sec >= 30 * 24 * 60 * 60) {
            time2sec -= 30 * 24 * 60 * 60;
            measurements.months += 1;
        } else if (time2sec >= 24 * 60 * 60) {
            time2sec -= 24 * 60 * 60;
            measurements.days += 1;
        } else if (time2sec >= 60 * 60) {
            time2sec -= 60 * 60;
            measurements.hours += 1;
        } else if (time2sec >= 60) {
            time2sec -= 60;
            measurements.minutes += 1;
        } else {
            time2sec -= 1;
            measurements.seconds += 1;
        }
    }
    return (
        (measurements.years
            ? {
                  count: measurements.years,
                  unit: "año",
              }
            : 0) ||
        (measurements.months
            ? {
                  count: measurements.months,
                  unit: "mes",
              }
            : 0) ||
        (measurements.days
            ? {
                  count: measurements.days,
                  unit: "día",
              }
            : 0) ||
        (measurements.hours
            ? {
                  count: measurements.hours,
                  unit: "hora",
              }
            : 0) ||
        (measurements.minutes
            ? {
                  count: measurements.minutes,
                  unit: "minuto",
              }
            : 0) ||
        (measurements.seconds
            ? {
                  count: measurements.seconds,
                  unit: "segundo",
              }
            : {
                  count: 0,
                  unit: "Justo ahora",
              })
    );
};

export default function Post({
    content,
    author,
    visibility,
    media,
    createdAt,
}: PostType) {
    return (
        <div className="flex flex-col justify-center">
            <p className="text-base text-stone-300 mt-2">{content}</p>
            <p className="text-xs text-stone-400 mt-2">
                hace {momento(createdAt).count} {momento(createdAt).unit}s por{" "}
                {author}
            </p>
            <p className="text-sm text-stone-300 mt-2">{visibility}</p>
            {media
                ? media.map(({ source, nsfw }, index) => (
                      <img
                          key={index}
                          src={source}
                          className="w-full h-48 rounded-lg"
                      />
                  ))
                : ""}
        </div>
    );
}
