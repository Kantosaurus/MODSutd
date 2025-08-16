interface User {
  id: string;
  studentId: string;
  password: string;
  name: string;
  pillar: string;
  year: number | string;
  term: number;
}

export async function authenticateUser(studentId: string, password: string): Promise<User | null> {
  try {
    console.log('Attempting to authenticate with:', { studentId });
    
    // In a real application, this would be an API call
    const response = await fetch('/sample%20responses/sample-users.json');
    if (!response.ok) {
      console.error('Failed to fetch users:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    console.log('Loaded users data:', data);
    
    const user = data.users.find(
      (u: User) => u.studentId === studentId && u.password === password
    );

    console.log('Found user:', user ? 'yes' : 'no');

    if (!user) {
      return null;
    }

    // In a real application, never return the password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
} 