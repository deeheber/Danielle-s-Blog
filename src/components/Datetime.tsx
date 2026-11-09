import { LOCALE } from "@config"

interface DatetimesProps {
  pubDatetime: string | Date
  modDatetime: string | Date | undefined | null
}

interface Props extends DatetimesProps {
  size?: "sm" | "lg"
  className?: string
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className,
}: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      {modDatetime && modDatetime > pubDatetime ? (
        <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
          Updated:
        </span>
      ) : (
        <span className="sr-only">Published:</span>
      )}
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime
          pubDatetime={pubDatetime}
          modDatetime={modDatetime}
        />
      </span>
    </div>
  )
}

const FormattedDatetime = ({ pubDatetime, modDatetime }: DatetimesProps) => {
  const myDatetime = new Date(
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime,
  )

  const date = myDatetime.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return <time dateTime={myDatetime.toISOString()}>{date}</time>
}
