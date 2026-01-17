import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Plus, Sparkles } from "lucide-react";
import { Subject } from "./types";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
];

interface SubjectFormProps {
  onAddSubject: (subject: Subject) => void;
}

export function SubjectForm({ onAddSubject }: SubjectFormProps) {
  const [subjectName, setSubjectName] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [preferredDay, setPreferredDay] = useState<string | undefined>(undefined);
  const [preferredTime, setPreferredTime] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subjectName.trim() || !professorName.trim()) return;

    const newSubject: Subject = {
      id: Date.now().toString(),
      name: subjectName.trim(),
      professor: professorName.trim(),
      preferredDay: preferredDay !== "none" ? preferredDay : undefined,
      preferredTime: preferredTime !== "none" ? preferredTime : undefined,
      color: generateColor(),
    };

    onAddSubject(newSubject);
    
    // Reset form
    setSubjectName("");
    setProfessorName("");
    setPreferredDay(undefined);
    setPreferredTime(undefined);
  };

  const generateColor = () => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-purple-600",
      "bg-gradient-to-br from-pink-500 to-orange-500",
      "bg-gradient-to-br from-green-500 to-teal-600",
      "bg-gradient-to-br from-indigo-500 to-blue-600",
      "bg-gradient-to-br from-red-500 to-pink-600",
      "bg-gradient-to-br from-yellow-500 to-orange-600",
      "bg-gradient-to-br from-purple-500 to-indigo-600",
      "bg-gradient-to-br from-teal-500 to-green-600",
      "bg-gradient-to-br from-cyan-500 to-blue-600",
      "bg-gradient-to-br from-rose-500 to-pink-600",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          Add New Subject
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                Subject Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="e.g., Data Structures"
                className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="professor" className="text-sm font-medium text-gray-700">
                Professor Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="professor"
                value={professorName}
                onChange={(e) => setProfessorName(e.target.value)}
                placeholder="e.g., Dr. Smith"
                className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day" className="text-sm font-medium text-gray-700">
                Preferred Day <span className="text-gray-400 text-xs">(Optional)</span>
              </Label>
              <Select value={preferredDay} onValueChange={setPreferredDay}>
                <SelectTrigger className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Any Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Any Day</SelectItem>
                  {DAYS.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                Preferred Time Slot <span className="text-gray-400 text-xs">(Optional)</span>
              </Label>
              <Select value={preferredTime} onValueChange={setPreferredTime}>
                <SelectTrigger className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="Any Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Any Time</SelectItem>
                  {TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subject
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
