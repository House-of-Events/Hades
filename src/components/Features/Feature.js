import {
  DollarSign,
  MessagesSquare,
  PersonStanding,
  Timer,
  Zap,
  ZoomIn,
} from 'lucide-react';

const Feature = ({
  heading = 'Our Core Features',
  subheading = 'Features',
  features = [
    {
      title: 'Real-time Notifications',
      description:
        'Get instant alerts before your favorite events start. Never miss a sports game, concert, or important event with our timely notification system.',
      icon: <Timer className="size-4 md:size-6" />,
    },
    {
      title: 'Global Event Channels',
      description:
        "Subscribe to specialized event channels from around the world. From local sports teams to international festivals, we've got you covered.",
      icon: <Zap className="size-4 md:size-6" />,
    },
    {
      title: 'Smart Event Discovery',
      description:
        "Discover new events that match your interests. Our intelligent system learns your preferences and suggests relevant events you'll love.",
      icon: <ZoomIn className="size-4 md:size-6" />,
    },
    {
      title: 'Easy Subscription Management',
      description:
        'Simple one-click subscriptions to any event channel. Manage all your event subscriptions from one convenient dashboard.',
      icon: <PersonStanding className="size-4 md:size-6" />,
    },
    {
      title: 'Free to Use',
      description:
        'Join and subscribe to event channels completely free. No hidden fees or premium tiers - just pure event discovery and notifications.',
      icon: <DollarSign className="size-4 md:size-6" />,
    },
    {
      title: 'Community Driven',
      description:
        'Create and share your own event channels with the community. Build your following and become the go-to source for specific event categories.',
      icon: <MessagesSquare className="size-4 md:size-6" />,
    },
  ],
}) => {
  return (
    <section className="py-12">
      <div className="container mx-auto max-w-7xl">
        <p className="mb-4 text-xs text-muted-foreground md:pl-5">
          {subheading}
        </p>
        <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">{heading}</h2>
        <div className="mx-auto mt-7 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
          {features.map((feature, idx) => (
            <div className="flex gap-6 rounded-lg md:block md:px-5" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
