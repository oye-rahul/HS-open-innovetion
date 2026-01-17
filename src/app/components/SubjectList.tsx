import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { BookOpen, Trash2, Edit2, User, Calendar, Clock } from "lucide-react";
import { Subject } from "./types";
import { motion, AnimatePresence } from "motion/react";

interface SubjectListProps {
  subjects: Subject[];
  onDeleteSubject: (id: string) => void;
}

export function SubjectList({ subjects, onDeleteSubject }: SubjectListProps) {
  if (subjects.length === 0) {
    return (
      <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-md">
        <CardContent className="py-12">
          <div className="text-center text-gray-500">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No subjects added yet</p>
            <p className="text-sm mt-2">Add your first subject to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          Subject List ({subjects.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
        <AnimatePresence>
          {subjects.map((subject) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${subject.color}`} />
                
                <div className="p-4 pl-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {subject.name}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-0"
                        >
                          Active
                        </Badge>
                      </div>
                      
                      <div className="space-y-1.5 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-indigo-500" />
                          <span>{subject.professor}</span>
                        </div>
                        
                        {(subject.preferredDay || subject.preferredTime) && (
                          <div className="flex flex-wrap gap-3">
                            {subject.preferredDay && (
                              <div className="flex items-center gap-1.5 text-xs bg-blue-50 px-2 py-1 rounded-md">
                                <Calendar className="w-3 h-3 text-blue-600" />
                                <span className="text-blue-700">{subject.preferredDay}</span>
                              </div>
                            )}
                            {subject.preferredTime && (
                              <div className="flex items-center gap-1.5 text-xs bg-purple-50 px-2 py-1 rounded-md">
                                <Clock className="w-3 h-3 text-purple-600" />
                                <span className="text-purple-700">{subject.preferredTime}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDeleteSubject(subject.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
