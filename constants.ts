import { QuizStep, Testimonial, Plan } from './types';

export const COLORS = {
  primary: '#0F172A',
  secondary: '#0EA5E9',
  accent: '#F43F5E',
  darkBg: '#020617',
  lightBg: '#FFFFFF',
};

export const QUIZ_DATA: QuizStep[] = [
  {
    type: 'question',
    data: {
      id: 'q1',
      text: { en: 'What is your current age?', es: '¿Cuál es tu edad actual?' },
      options: [
        { id: 'a', label: { en: '18 - 25', es: '18 - 25' }, value: '18-25' },
        { id: 'b', label: { en: '26 - 35', es: '26 - 35' }, value: '26-35' },
        { id: 'c', label: { en: '36 - 45', es: '36 - 45' }, value: '36-45' },
        { id: 'd', label: { en: '46 - 55', es: '46 - 55' }, value: '46-55' },
        { id: 'e', label: { en: '55+', es: '55+' }, value: '55+' },
      ]
    }
  },
  {
    type: 'question',
    data: {
      id: 'q2',
      text: { en: 'What is your primary health goal?', es: '¿Cuál es tu objetivo principal?' },
      options: [
        { id: 'a', label: { en: 'Improve Stamina', es: 'Mejorar resistencia' }, value: 'stamina' },
        { id: 'b', label: { en: 'Erection Quality', es: 'Calidad de erecciones' }, value: 'erection' },
        { id: 'c', label: { en: 'Bladder Control', es: 'Control de vejiga' }, value: 'bladder' },
        { id: 'd', label: { en: 'Overall Performance', es: 'Rendimiento general' }, value: 'wellness' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i1',
      title: { en: 'The Foundation of Power', es: 'La Base del Poder' },
      content: {
        en: 'The Pubococcygeus (PC) muscle is the hidden core of male vitality. Strengthening it directly correlates with increased blood flow and neurological control.',
        es: 'El músculo Pubocoxígeo (PC) es el núcleo oculto de la vitalidad masculina. Fortalecerlo se correlaciona directamente con un mayor flujo sanguíneo y control neurológico.'
      },
      stats: { en: '84% of men see improvement in 4 weeks.', es: 'El 84% de los hombres ven mejoras en 4 semanas.' },
      imagePrompt: 'anatomy'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q3',
      text: { en: 'How satisfied are you with your erection quality?', es: '¿Qué tan satisfecho estás con la calidad de tus erecciones?' },
      options: [
        { id: 'a', label: { en: 'Very Satisfied', es: 'Muy satisfecho' }, value: 'very' },
        { id: 'b', label: { en: 'Somewhat Satisfied', es: 'Algo satisfecho' }, value: 'somewhat' },
        { id: 'c', label: { en: 'Unsatisfied', es: 'Insatisfecho' }, value: 'no' },
      ]
    }
  },
  {
    type: 'question',
    data: {
      id: 'q4',
      text: { en: 'Do you experience premature ejaculation?', es: '¿Experimentas eyaculación precoz?' },
      options: [
        { id: 'a', label: { en: 'Often', es: 'A menudo' }, value: 'often' },
        { id: 'b', label: { en: 'Sometimes', es: 'A veces' }, value: 'sometimes' },
        { id: 'c', label: { en: 'Rarely', es: 'Rara vez' }, value: 'rarely' },
        { id: 'd', label: { en: 'Never', es: 'Nunca' }, value: 'never' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i2',
      title: { en: 'Master Your Stamina', es: 'Domina tu Resistencia' },
      content: {
        en: 'Stamina is a skill, not just luck. By training the pelvic floor, you gain the ability to voluntarily regulate arousal and delay ejaculation naturally.',
        es: 'La resistencia es una habilidad, no solo suerte. Al entrenar el suelo pélvico, obtienes la capacidad de regular voluntariamente la excitación y retrasar la eyaculación de forma natural.'
      },
      stats: { en: 'Average duration increases by 300%.', es: 'La duración promedio aumenta un 300%.' },
      imagePrompt: 'stamina'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q5',
      text: { en: 'How often do you wake up at night to urinate?', es: '¿Con qué frecuencia te levantas por la noche para orinar?' },
      options: [
        { id: 'a', label: { en: '2+ times', es: '2+ veces' }, value: '2plus' },
        { id: 'b', label: { en: 'Once', es: 'Una vez' }, value: 'once' },
        { id: 'c', label: { en: 'Never', es: 'Nunca' }, value: 'never' },
      ]
    }
  },
  {
    type: 'question',
    data: {
      id: 'q6',
      text: { en: 'How often do you experience morning erections?', es: '¿Con qué frecuencia tienes erecciones matutinas?' },
      options: [
        { id: 'a', label: { en: 'Almost every morning', es: 'Casi todas las mañanas' }, value: 'daily' },
        { id: 'b', label: { en: 'A few times a week', es: 'Unas veces por semana' }, value: 'weekly' },
        { id: 'c', label: { en: 'Rarely or never', es: 'Rara vez o nunca' }, value: 'rarely' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i3',
      title: { en: 'Blood Flow is King', es: 'El Flujo Sanguíneo es el Rey' },
      content: {
        en: 'Erection quality depends 100% on vascular efficiency. A strong pelvic floor acts as a valve, maintaining healthy pressure for longer, harder erections.',
        es: 'La calidad de la erección depende al 100% de la eficiencia vascular. Un suelo pélvico fuerte actúa como una válvula, manteniendo una presión saludable para erecciones más largas y firmes.'
      },
      stats: { en: '92% report harder, consistent results.', es: 'El 92% reporta resultados más firmes y constantes.' },
      imagePrompt: 'bloodflow'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q7',
      text: { en: 'What is your current stress level?', es: '¿Cuál es tu nivel de estrés actual?' },
      options: [
        { id: 'a', label: { en: 'High', es: 'Alto' }, value: 'high' },
        { id: 'b', label: { en: 'Moderate', es: 'Moderado' }, value: 'moderate' },
        { id: 'c', label: { en: 'Low', es: 'Bajo' }, value: 'low' },
      ]
    }
  },
  {
    type: 'question',
    data: {
      id: 'q8',
      text: { en: 'How many hours do you spend sitting daily?', es: '¿Cuántas horas pasas sentado al día?' },
      options: [
        { id: 'a', label: { en: '8+ hours', es: '8+ horas' }, value: 'sedentary' },
        { id: 'b', label: { en: '4 - 8 hours', es: '4 - 8 horas' }, value: 'average' },
        { id: 'c', label: { en: 'Less than 4 hours', es: 'Menos de 4 horas' }, value: 'active' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i4',
      title: { en: 'Combat The Sitting Epidemic', es: 'Combate la Epidemia del Sedentarismo' },
      content: {
        en: 'Prolonged sitting compresses the pelvic floor and restricts circulation. Our routine "reboots" your system, reversing the negative effects of office work.',
        es: 'Estar sentado por mucho tiempo comprime el suelo pélvico y restringe la circulación. Nuestra rutina "reinicia" tu sistema, revirtiendo los efectos negativos del trabajo de oficina.'
      },
      stats: { en: 'Instant relief from pelvic tension reported.', es: 'Alivio instantáneo de la tensión pélvica reportado.' },
      imagePrompt: 'sitting'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q9',
      text: { en: 'Do you smoke or consume alcohol regularly?', es: '¿Fumas o consumes alcohol regularmente?' },
      options: [
        { id: 'a', label: { en: 'Yes, both', es: 'Sí, ambos' }, value: 'both' },
        { id: 'b', label: { en: 'Only alcohol', es: 'Solo alcohol' }, value: 'alcohol' },
        { id: 'c', label: { en: 'Neither', es: 'Ninguno' }, value: 'none' },
      ]
    }
  },
  {
    type: 'question',
    data: {
      id: 'q10',
      text: { en: 'Do you experience any pelvic or groin pain?', es: '¿Sientes algún dolor pélvico o en la ingle?' },
      options: [
        { id: 'a', label: { en: 'Yes', es: 'Sí' }, value: 'yes' },
        { id: 'b', label: { en: 'No', es: 'No' }, value: 'no' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i5',
      title: { en: 'Long-term Prostate Health', es: 'Salud Prostática a Largo Plazo' },
      content: {
        en: 'Pelvic exercises reduce congestion in the prostate area and improve urinary flow. It is a vital investment in your future longevity as a man.',
        es: 'Los ejercicios pélvicos reducen la congestión en el área prostática y mejoran el flujo urinario. Es una inversión vital en tu futura longevidad como hombre.'
      },
      stats: { en: 'Used by professional athletes & urologists.', es: 'Usado por atletas profesionales y urólogos.' },
      imagePrompt: 'longevity'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q11',
      text: { en: 'What is your libido level right now?', es: '¿Cómo es tu nivel de libido actualmente?' },
      options: [
        { id: 'a', label: { en: 'High', es: 'Alto' }, value: 'high' },
        { id: 'b', label: { en: 'Moderate', es: 'Moderado' }, value: 'moderate' },
        { id: 'c', label: { en: 'Low', es: 'Bajo' }, value: 'low' },
      ]
    }
  },
  {
    type: 'question',
    data: {
      id: 'q12',
      text: { en: 'How many hours of sleep do you get?', es: '¿Cuántas horas duermes?' },
      options: [
        { id: 'a', label: { en: 'Less than 6', es: 'Menos de 6' }, value: 'low' },
        { id: 'b', label: { en: '6 - 8 hours', es: '6 - 8 horas' }, value: 'normal' },
        { id: 'c', label: { en: '8+ hours', es: '8+ horas' }, value: 'good' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i6',
      title: { en: 'Recovery & Peak Testosterone', es: 'Recuperación y Testosterona Máxima' },
      content: {
        en: 'Testosterone is primarily produced during deep REM sleep. Proper pelvic circulation enhances the hormonal feedback loop, ensuring you wake up ready.',
        es: 'La testosterona se produce principalmente durante el sueño REM profundo. La circulación pélvica adecuada mejora el ciclo de retroalimentación hormonal, asegurando que te despiertes listo.'
      },
      stats: { en: 'Morning energy levels increase by 45%.', es: 'Los niveles de energía matutina aumentan un 45%.' },
      imagePrompt: 'recovery'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q13',
      text: { en: 'Have you tried Kegels before?', es: '¿Has probado ejercicios de Kegel antes?' },
      options: [
        { id: 'a', label: { en: 'Yes, but stopped', es: 'Sí, pero paré' }, value: 'stopped' },
        { id: 'b', label: { en: 'No, never', es: 'No, nunca' }, value: 'never' },
        { id: 'c', label: { en: 'Yes, current user', es: 'Sí, actualmente' }, value: 'active' },
      ]
    }
  },
  {
    type: 'question',
    data: {
      id: 'q14',
      text: { en: 'Are you in a relationship?', es: '¿Estás en una relación?' },
      options: [
        { id: 'a', label: { en: 'Yes', es: 'Sí' }, value: 'yes' },
        { id: 'b', label: { en: 'No', es: 'No' }, value: 'no' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i7',
      title: { en: 'The Confidence Connection', es: 'La Conexión de la Confianza' },
      content: {
        en: 'Psychological performance is tied to physical mastery. Eliminating anxiety about performance creates a positive feedback loop that benefits your entire lifestyle.',
        es: 'El rendimiento psicológico está ligado al dominio físico. Eliminar la ansiedad por el rendimiento crea un ciclo de retroalimentación positiva que beneficia todo tu estilo de vida.'
      },
      stats: { en: '78% report higher self-confidence.', es: 'El 78% reporta una mayor confianza en sí mismo.' },
      imagePrompt: 'mindset'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q15',
      text: { en: 'How often do you exercise?', es: '¿Con qué frecuencia haces ejercicio?' },
      options: [
        { id: 'a', label: { en: 'Daily', es: 'Diario' }, value: 'daily' },
        { id: 'b', label: { en: '2-3 times/week', es: '2-3 veces/semana' }, value: 'weekly' },
        { id: 'c', label: { en: 'Rarely', es: 'Rara vez' }, value: 'rarely' },
      ]
    }
  },
  {
    type: 'question',
    data: {
      id: 'q16',
      text: { en: 'Your main motivation is:', es: 'Tu motivación principal es:' },
      options: [
        { id: 'a', label: { en: 'Self-confidence', es: 'Confianza propia' }, value: 'confidence' },
        { id: 'b', label: { en: 'Partner pleasure', es: 'Placer de la pareja' }, value: 'partner' },
        { id: 'c', label: { en: 'Health and longevity', es: 'Salud y longevidad' }, value: 'health' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i8',
      title: { en: 'The 5-Minute Daily Habit', es: 'El Hábito Diario de 5 Minutos' },
      content: {
        en: 'Consistency beats intensity. Our high-efficiency routines are designed to deliver maximum results in minimum time, making it impossible to fail.',
        es: 'La constancia vence a la intensidad. Nuestras rutinas de alta eficiencia están diseñadas para ofrecer máximos resultados en el mínimo tiempo, haciendo imposible fallar.'
      },
      stats: { en: 'Over 1M+ sessions completed monthly.', es: 'Más de 1M+ de sesiones completadas al mes.' },
      imagePrompt: 'habit'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q17',
      text: { en: 'Can you commit to 5 mins daily?', es: '¿Puedes comprometerte a 5 min diarios?' },
      options: [
        { id: 'a', label: { en: 'Absolutely', es: 'Absolutamente' }, value: 'yes' },
        { id: 'b', label: { en: 'I will try', es: 'Lo intentaré' }, value: 'try' },
      ]
    }
  },
  {
    type: 'question',
    data: {
      id: 'q18',
      text: { en: 'Do you use any other health apps?', es: '¿Usas otras apps de salud?' },
      options: [
        { id: 'a', label: { en: 'Yes', es: 'Sí' }, value: 'yes' },
        { id: 'b', label: { en: 'No', es: 'No' }, value: 'no' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i9',
      title: { en: 'AI-Driven Personalization', es: 'Personalización Impulsada por IA' },
      content: {
        en: 'No two bodies are the same. Our engine creates a unique progression path for you, adjusting daily based on your biometric feedback.',
        es: 'No hay dos cuerpos iguales. Nuestro motor crea un camino de progresión único para ti, ajustándose diariamente en función de tu feedback biométrico.'
      },
      stats: { en: 'Precision targeted workouts for 99.8% accuracy.', es: 'Entrenamientos de precisión con 99.8% de exactitud.' },
      imagePrompt: 'ai_tech'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q19',
      text: { en: 'Desired results speed:', es: 'Velocidad de resultados deseada:' },
      options: [
        { id: 'a', label: { en: 'ASAP', es: 'Lo antes posible' }, value: 'fast' },
        { id: 'b', label: { en: 'Sustainable pace', es: 'Ritmo sostenible' }, value: 'slow' },
      ]
    }
  },
  {
    type: 'info',
    data: {
      id: 'i10',
      title: { en: 'Your Performance Dashboard', es: 'Tu Panel de Rendimiento' },
      content: {
        en: 'Track every micro-improvement. Visualizing your progress reinforces the habit and guarantees long-term success through data-driven coaching.',
        es: 'Sigue cada micro-mejora. Visualizar tu progreso refuerza el hábito y garantiza el éxito a largo plazo mediante coaching basado en datos.'
      },
      stats: { en: 'Visual tracking increases consistency by 3x.', es: 'El seguimiento visual aumenta la constancia 3 veces.' },
      imagePrompt: 'performance_stats'
    }
  },
  {
    type: 'question',
    data: {
      id: 'q20',
      text: { en: 'Ready to see your plan?', es: '¿Listo para ver tu plan?' },
      options: [
        { id: 'a', label: { en: 'Show me!', es: '¡Muéstramelo!' }, value: 'ready' },
      ]
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'David R.',
    age: 34,
    content: {
      en: "KegelCoach changed my life. After just 3 weeks, my stamina improved drastically.",
      es: "KegelCoach cambió mi vida. Después de solo 3 semanas, mi resistencia mejoró drásticamente."
    },
    rating: 5,
    metric: { en: "150% Increase in Duration", es: "150% aumento en duración" },
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 't2',
    name: 'Mark S.',
    age: 45,
    content: {
      en: "Professional interface and easy to follow. No more nightly bathroom trips.",
      es: "Interfaz profesional y fácil de seguir. Se acabaron los viajes nocturnos al baño."
    },
    rating: 5,
    metric: { en: "0 Nightly Bathroom Trips", es: "0 viajes nocturnos al baño" },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 't3',
    name: 'James T.',
    age: 28,
    content: {
      en: "The science is real. It's like a gym for your most important muscles.",
      es: "La ciencia es real. Es como un gimnasio para tus músculos más importantes."
    },
    rating: 5,
    metric: { en: "8/10 Performance Rating", es: "Calificación de rendimiento 8/10" },
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80'
  }
];

export const PLANS: Plan[] = [
  {
    id: 'p1',
    name: { en: 'Monthly Entry', es: 'Entrada Mensual' },
    duration: { en: '1 Month', es: '1 Mes' },
    pricePerMonth: 12.99,
    totalPrice: 12.99,
  },
  {
    id: 'p3',
    name: { en: 'Quarterly Kickstart', es: 'Inicio Trimestral' },
    duration: { en: '3 Months', es: '3 Meses' },
    pricePerMonth: 9.99,
    totalPrice: 29.99,
    savings: '23%',
  },
  {
    id: 'p2',
    name: { en: 'Ultimate Transformation (6M)', es: 'Transformación (6 Meses)' },
    duration: { en: '6 Months', es: '6 Meses' },
    pricePerMonth: 8.33,
    totalPrice: 49.99,
    savings: '36%',
    isPopular: true,
  },
  {
    id: 'p4',
    name: { en: 'Annual Mastery', es: 'Maestría Anual' },
    duration: { en: '1 Year', es: '1 Año' },
    pricePerMonth: 5.83,
    totalPrice: 69.99,
    savings: '55%',
  }
];