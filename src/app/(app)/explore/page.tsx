import ConceptExplainer from '@/components/concept-explainer';

export default function ExplorePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Concept Explainer</h1>
        <p className="text-muted-foreground mt-1">
          Struggling with a topic? Enter it below and let our AI assistant break it down for you.
        </p>
      </div>
      <ConceptExplainer />
    </div>
  );
}
