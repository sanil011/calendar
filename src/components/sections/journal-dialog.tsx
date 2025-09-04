import { useState, useEffect, useContext } from "react"
import { CalendarContext } from "../../contexts/calendar-context"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { fromDDMMYYYYToISO, toDDMMYYYY } from "@/util/date"

/**
 * Represents a Journal Modal UI component.
 * @component
 * @example
 * <JournalDialog
    handleImageChange={handleImageChange}
    imageUrl={imageUrl}
    setImageUrl={setImageUrl}
    setIsOpen={setIsOpen}
    isOpen={isOpen}
 * />
 */



type JournalDialogProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    handleImageChange: (file: File | null) => void;
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;
    mode?: "create" | "edit"
    initialEntry?: Partial<JournalType> & { id?: string }
}



export function JournalDialog(
    { isOpen,
        setIsOpen,
        handleImageChange,
        imageUrl,
        setImageUrl,
        mode = "create",
        initialEntry,
    }: JournalDialogProps) {

    const { journalData, setJournalData } = useContext(CalendarContext)
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("") // yyyy-mm-dd from <input type="date">
    const [rating, setRating] = useState<string>("") // keep as string until we parse


    // Prefill when opening for edit / or when initialEntry changes
    useEffect(() => {
        if (!isOpen) return
        if (mode === "edit" && initialEntry) {
            setDescription(initialEntry.description ?? "")
            // incoming stored date is dd/MM/yyyy; convert to yyyy-MM-dd for the input
            setDate(fromDDMMYYYYToISO(initialEntry.date ?? ""))
            setRating(
                initialEntry.rating !== undefined && initialEntry.rating !== null
                    ? String(initialEntry.rating)
                    : ""
            )
            if (initialEntry.imgUrl) setImageUrl(initialEntry.imgUrl)
        } else if (mode === "create") {
            // fresh form
            setDescription("")
            setDate("")
            setRating("")
            setImageUrl(null)
        }
    }, [isOpen, mode, initialEntry])



    const handleClose = () => {

        const id = String(Date.now())

        const payload: JournalType = {
            id,
            imgUrl: imageUrl ?? "",
            rating: Number.isNaN(parseFloat(rating)) ? 0 : parseFloat(rating),
            categories: [], // you can fill this as needed
            date: toDDMMYYYY(date),
            description: description.trim(),
        }


        if (mode === "edit") {
            const data = journalData.map((item) => (item.id === initialEntry?.id ? payload : item))
            setJournalData(data)
        } else {
            setJournalData([...journalData, payload])
        }

        // (Optional) reset form after logging
        setDescription("")
        setDate("")
        setRating("")
        setImageUrl(null)

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Journal</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="What happened?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="rating">Rating</Label>
                        <Input
                            id="rating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            placeholder="4.8"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                        />
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Selected preview"
                                className="mt-2 h-24 w-24 rounded object-cover"
                            />
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            handleClose()
                            // You can also do validation here before closing if you want
                            setIsOpen(false) // closing triggers payload creation & console.log
                        }}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
