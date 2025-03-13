import { useGitHub } from '../hooks/useGitHub';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Github, Star } from 'lucide-react';

interface GitHubProjectsProps {
  username: string;
}

export function GitHubProjects({ username }: GitHubProjectsProps) {
  const { repos, loading, error } = useGitHub(username);

  if (loading) {
    return <div className="text-center py-8">Se încarcă proiectele...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {repos.map((repo) => (
        <Card key={repo.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              {repo.name}
            </CardTitle>
            <CardDescription>{repo.description || 'Fără descriere'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.topics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{repo.language || 'Nespecificat'}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{repo.stargazers_count}</span>
              </div>
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-blue-500 hover:underline"
            >
              Vezi pe GitHub →
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 