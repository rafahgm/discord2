interface AppTheme {
    colors: {
        background: string;
        foreground: string;
        primary: string;
        warning: string;
        danger: string;
        text: string;
    },
    border: {
        radius: string
    }
}

interface DiscordUser {
    uid: string;
    displayName: string;
    email: string | null;
    friends?: DiscordUser[];
}

interface Message {
    user: DiscordUser;
    text: string;
}

interface ChatRoom {
    users: DiscordUser[];
    messages: Message[];
}

