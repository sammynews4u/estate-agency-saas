export type AIToolType =
  | 'property_description'
  | 'client_response'
  | 'follow_up_message'
  | 'listing_analyzer'
  | 'property_match'
  | 'pricing_suggestion';

export type AIGenerationStatus = 'draft' | 'saved' | 'used';

export type AIPromptTemplate = {
  id: string;
  name: string;
  toolType: AIToolType;
  description: string;
  defaultPrompt: string;
};

export type AIGenerationRecord = {
  id: string;
  toolType: AIToolType;
  title: string;
  inputSummary: string;
  output: string;
  relatedProperty?: string;
  relatedClient?: string;
  status: AIGenerationStatus;
  createdAt: string;
};

export const aiToolLabels: Record<AIToolType, string> = {
  property_description: 'Property Description Generator',
  client_response: 'Client Response Generator',
  follow_up_message: 'Follow-Up Message Generator',
  listing_analyzer: 'Listing Improvement Analyzer',
  property_match: 'Property Match Assistant',
  pricing_suggestion: 'Pricing Suggestion Assistant',
};

export const generationStatusLabels: Record<AIGenerationStatus, string> = {
  draft: 'Draft',
  saved: 'Saved',
  used: 'Used',
};

export const demoPromptTemplates: AIPromptTemplate[] = [
  {
    id: 'tpl_ai_001',
    name: 'Premium property description',
    toolType: 'property_description',
    description: 'Turn rough property details into polished marketplace copy.',
    defaultPrompt: 'Write a premium real estate description that highlights location, title confidence, amenities, target buyer, and viewing urgency.',
  },
  {
    id: 'tpl_ai_002',
    name: 'Fast WhatsApp inquiry reply',
    toolType: 'client_response',
    description: 'Reply quickly to a fresh buyer or tenant inquiry.',
    defaultPrompt: 'Write a warm but professional WhatsApp reply that confirms availability, asks qualification questions, and offers viewing slots.',
  },
  {
    id: 'tpl_ai_003',
    name: 'Post-viewing follow-up',
    toolType: 'follow_up_message',
    description: 'Move a prospect from inspection to negotiation.',
    defaultPrompt: 'Write a concise follow-up after viewing. Ask for feedback, restate the property strengths, and propose the next step.',
  },
  {
    id: 'tpl_ai_004',
    name: 'Listing quality audit',
    toolType: 'listing_analyzer',
    description: 'Identify weak listing copy, missing proof points and conversion blockers.',
    defaultPrompt: 'Analyse this listing and identify missing details, weak claims, pricing risks, media gaps, and trust signals to add.',
  },
  {
    id: 'tpl_ai_005',
    name: 'Client-property match',
    toolType: 'property_match',
    description: 'Explain why a property matches a client preference profile.',
    defaultPrompt: 'Compare the client preferences with available property details and give a fit score, match reasons, risks, and next action.',
  },
  {
    id: 'tpl_ai_006',
    name: 'Pricing improvement note',
    toolType: 'pricing_suggestion',
    description: 'Help agents justify pricing adjustments to sellers or landlords.',
    defaultPrompt: 'Suggest a pricing improvement based on market demand, comparable properties, condition, location and negotiation range.',
  },
];

export const demoAIGenerations: AIGenerationRecord[] = [
  {
    id: 'ai_gen_001',
    toolType: 'property_description',
    title: 'Lekki duplex premium copy',
    inputSummary: '5-bedroom detached duplex, Lekki Phase 1, pool, BQ, fitted kitchen, Governor’s Consent.',
    output: 'Position this as a premium family home in Lekki Phase 1 with clear title confidence, lifestyle amenities and immediate viewing availability. The copy should push trust, scarcity and convenience without exaggerating the property.',
    relatedProperty: 'Luxury 5-Bedroom Detached Duplex in Lekki Phase 1',
    status: 'saved',
    createdAt: '2026-06-03',
  },
  {
    id: 'ai_gen_002',
    toolType: 'follow_up_message',
    title: 'Ikoyi tenant post-viewing follow-up',
    inputSummary: 'Tenant viewed serviced apartment and asked about service charge, power and payment terms.',
    output: 'Thank the tenant for attending, summarise the apartment benefits, clarify the next documents needed, and ask whether to proceed with lease discussion today.',
    relatedProperty: 'Serviced 3-Bedroom Apartment in Ikoyi',
    relatedClient: 'Femi Adebayo',
    status: 'used',
    createdAt: '2026-06-04',
  },
  {
    id: 'ai_gen_003',
    toolType: 'listing_analyzer',
    title: 'Sangotedo land listing audit',
    inputSummary: '900sqm dry land, Sangotedo, pending verification, road access, Deed of Assignment.',
    output: 'The listing needs stronger proof: survey plan status, exact coordinates, neighbourhood landmarks, drainage note, title chain and recent comparable plots. Do not overprice before verification is complete.',
    relatedProperty: 'Dry Land Measuring 900sqm in Sangotedo',
    status: 'draft',
    createdAt: '2026-06-04',
  },
];

export function generateDemoAIOutput(toolType: AIToolType, context: string) {
  const safeContext = context.trim() || 'No context supplied. Add real property/client details before using this with live clients.';

  const outputs: Record<AIToolType, string> = {
    property_description: `Premium listing draft:\n\n${safeContext}\n\nPosition the property around location strength, verified documents, functional layout, lifestyle value and viewing urgency. Avoid empty hype. Mention the strongest amenities first, then close with a clear inspection call-to-action.`,
    client_response: `Client response draft:\n\nThank you for your interest. Based on your request, this property appears worth inspecting, but we need to confirm your preferred budget, move-in or purchase timeline, payment readiness and viewing availability. I can send the full details and available inspection slots now.\n\nContext used: ${safeContext}`,
    follow_up_message: `Follow-up draft:\n\nThank you for taking time to review the property. From your requirements, the strongest fit is the location, available amenities and documentation pathway. The sensible next step is to confirm your feedback, answer any concerns and decide whether to proceed to negotiation or view another close match.\n\nContext used: ${safeContext}`,
    listing_analyzer: `Listing audit:\n\nStrengths: location demand, clear property category and buyer appeal.\nMissing proof: title document summary, exact property size, inspection readiness, service charge details where relevant, and stronger photos/videos.\nRisk: weak listings attract unserious inquiries and pricing objections. Fix the trust gaps before pushing campaigns.\n\nContext reviewed: ${safeContext}`,
    property_match: `Property match note:\n\nFit score: 82/100.\nWhy it matches: location, budget band and property type appear aligned.\nRisks to confirm: documents, availability, hidden charges, client timeline and negotiation flexibility.\nNext action: send two alternatives plus one direct viewing option so the client does not drift.\n\nContext used: ${safeContext}`,
    pricing_suggestion: `Pricing suggestion:\n\nDo not price from emotion. Use comparable listings, verified transaction history, property condition, title quality and demand pressure. Start with a defensible listing price, keep a controlled negotiation range, and prepare evidence before speaking with the seller.\n\nContext used: ${safeContext}`,
  };

  return outputs[toolType];
}
