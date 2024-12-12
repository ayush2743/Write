import { UserIcon, MailIcon, KeyIcon } from "lucide-react";

interface RegInputProps {
    label: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    color: string;
}

export default function RegInput({ label, type, onChange, placeholder, color }: RegInputProps) {
    const renderIcon = () => {
        switch (type) {
            case "email":
                return <MailIcon className="w-5 h-5 text-gray-400" />;
            case "password":
                return <KeyIcon className="w-5 h-5 text-gray-400" />;
            default:
                return <UserIcon className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <div className="mb-6">
            <label className="block mb-2 ml-1 text-sm font-medium">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type || "text"}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full p-3 text-white border-2 border-gray-500 rounded-md bg-black/30 backdrop-blur-xl ${color} focus:outline-none`}
                    autoComplete="off"
                    autoSave="off"
                />
                <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
                    {renderIcon()}
                </div>
            </div>
        </div>
    )
}
