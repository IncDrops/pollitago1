"use client";

import { useState } from 'react';
import { collection, addDoc } from '@firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { db } from '@/lib/firestore'; // Assuming your Firestore instance is exported as 'db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const [isAgePublic, setIsAgePublic] = useState(false);
  const [isDateOfBirthPublic, setIsDateOfBirthPublic] = useState(false);
  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const age = calculateAge(dateOfBirth);
      // Add user data to Firestore
      const docRef = addDoc(collection(db, 'users'), {
        fullName,
        username,
        dateOfBirth,
        gender,
        age, // Store calculated age
        isAgePublic,
        isDateOfBirthPublic,
      });
      console.log('User signed up with ID: ', (docRef as any).id); // Cast to any to avoid TS error on docRef.id
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    setFullName('');
    setUsername('');
    setDateOfBirth('');
    setGender('');
    setIsAgePublic(false);
    setIsDateOfBirthPublic(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender} required>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="makeAgePublic"
                checked={isAgePublic}
                onCheckedChange={(checked) => setIsAgePublic(checked as boolean)}
              />
              <Label htmlFor="makeAgePublic">Make age public</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="makeDateOfBirthPublic"
                checked={isDateOfBirthPublic}
                onCheckedChange={(checked) => setIsDateOfBirthPublic(checked as boolean)}
              />
              <Label htmlFor="makeDateOfBirthPublic">Make date of birth public</Label>
            </div>


            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}