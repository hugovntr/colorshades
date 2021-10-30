import { DarkIcon, LightIcon, SystemIcon } from "@/components/icons";

export default [
    {
        name: "Turn on Dark mode",
        type: "command",
        Icon: DarkIcon,
        action: {
            type: "scheme",
            value: "dark",
        },
    },
    {
        name: "Turn on Light mode",
        type: "command",
        Icon: LightIcon,
        action: {
            type: "scheme",
            value: "light",
        },
    },
    {
        name: "Turn on System mode",
        type: "command",
        Icon: SystemIcon,
        action: {
            type: "scheme",
            value: "system",
        },
    },
];
