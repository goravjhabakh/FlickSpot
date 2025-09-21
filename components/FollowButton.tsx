'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import { follow } from "@/actions/user";
import { toast } from "sonner";

const FollowButton = ({userId} : {userId: string}) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleFollow = async() => {
        setIsLoading(true);
        try {
            await follow(userId);
            toast.success('Followed')
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button size={'sm'} variant={'secondary'} onClick={handleFollow} disabled={isLoading} className="w-20">
            {isLoading ? <LoaderIcon className="size-4 animate-spin"/> : "Follow"}
        </Button>
    )
}

export default FollowButton;