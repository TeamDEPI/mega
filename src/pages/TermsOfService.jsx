import React from "react";

export default function TermsOfService() {
  return (
    <div className="my-30">
      <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using Insove Medical Healthcare ("the Service"),
            you accept and agree to be bound by the terms and provision of this
            agreement. If you do not agree to these terms, please do not use our
            services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. Use of Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our platform connects patients with healthcare clinics and
            providers. You agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Provide accurate and complete information when registering</li>
            <li>Maintain the security of your account credentials</li>
            <li>Use the service only for lawful purposes</li>
            <li>Not impersonate any person or entity</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. Medical Disclaimer
          </h2>
          <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded">
            <p className="text-gray-700 leading-relaxed">
              Insove is a platform that facilitates connections between patients
              and healthcare providers. We do not provide medical advice,
              diagnosis, or treatment. Always seek the advice of your physician
              or other qualified health provider with any questions you may have
              regarding a medical condition.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. User Accounts
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you create an account with us, you must provide information
            that is accurate, complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of your account.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You are responsible for safeguarding the password and for all
            activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Clinic Registration
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Healthcare providers and clinics who apply to join our platform
            must:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Hold valid licenses and certifications</li>
            <li>Maintain professional liability insurance</li>
            <li>Comply with HIPAA and all applicable healthcare regulations</li>
            <li>Provide accurate information about services offered</li>
            <li>Maintain professional standards of care</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Privacy and Data Protection
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your use of the Service is also governed by our Privacy Policy.
            Please review our Privacy Policy, which also governs the Service and
            informs users of our data collection practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of Insove Medical
            Healthcare. The Service is protected by copyright, trademark, and
            other laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            In no event shall Insove Medical Healthcare, nor its directors,
            employees, partners, agents, suppliers, or affiliates, be liable for
            any indirect, incidental, special, consequential or punitive
            damages, including without limitation, loss of profits, data, use,
            goodwill, or other intangible losses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            9. Termination
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may terminate or suspend access to our Service immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            10. Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. We will provide notice of any significant
            changes by posting the new Terms on this page and updating the "Last
            updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            11. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Terms, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700">Email: legal@insove.com</p>
            <p className="text-gray-700">Phone: [Your Phone Number]</p>
            <p className="text-gray-700">Address: [Your Business Address]</p>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center">
        <a
          href="/"
          className="inline-block bg-cyan-500 text-white px-8 py-3 rounded-full font-medium hover:bg-cyan-600 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
