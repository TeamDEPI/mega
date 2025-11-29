import post from "../../assets/images/Post.png";

function RecentPosts() {
  const posts = [
    {
      id: 1,
      date: "Jan 2, 2023",
      title: "10 Foods To Avoid For Your Heart Health",
      desc: "It’s normal to feel anxiety, worry and grief any time you’re diagnosed with a condition that’s certainly true... Read more",
      image: post,
    },
    {
      id: 2,
      date: "Jan 5, 2023",
      title: "Top 5 Exercises For Better Cardio Health",
      desc: "Keeping your heart healthy is vital. Try these simple exercises to improve circulation and stamina... Read more",
      image: post,
    },
    {
      id: 3,
      date: "Jan 8, 2023",
      title: "How Sleep Impacts Your Blood Pressure",
      desc: "Sleep plays a bigger role in your cardiovascular health than you might think. Here’s why it matters... Read more",
      image: post,
    },
  ];

  return (
    <section>
      <div className="space-y-16 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-[#4C5354]">Our Recent Posts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {posts.map((post) => (
            <div
              key={post.id}
              className="w-[300px] sm:w-[350px] shadow-xl rounded-xl overflow-hidden"
            >
              <img src={post.image} alt={post.title} className="w-full" />
              <div className="p-4">
                <span className="text-[#808080]">{post.date}</span>
                <h3 className="font-bold text-2xl text-[#4C5354] mt-2">
                  {post.title}
                </h3>
                <p className="text-[#808080] mt-1">{post.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="#"
          className="bg-[#1CBCCF] hover:bg-[#1ca5b4] text-sm sm:text-base transition duration-300 text-white px-10 sm:px-15 tracking-widest py-3 sm:py-4 rounded-full"
        >
          READ MORE BLOGS
        </a>
      </div>
    </section>
  );
}

export default RecentPosts;
