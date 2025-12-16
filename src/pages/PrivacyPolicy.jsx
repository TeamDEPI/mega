import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="my-30">
      <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
        <section>
          <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded mb-6">
            <p className="text-gray-700 leading-relaxed">
              At Insove Medical Healthcare, we take your privacy seriously. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            1. Information We Collect
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Personal Information
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may collect personal information that you voluntarily provide to
            us when you:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Register for an account</li>
            <li>Apply as a clinic or healthcare provider</li>
            <li>Contact us for support</li>
            <li>Subscribe to our newsletter</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Health Information
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            This may include:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Name, email address, phone number</li>
            <li>Date of birth, gender</li>
            <li>Medical history and conditions (when provided)</li>
            <li>Insurance information</li>
            <li>Appointment details</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Automatically Collected Information
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>IP address and browser type</li>
            <li>Device information</li>
            <li>Usage data and analytics</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Provide, operate, and maintain our platform</li>
            <li>Connect you with healthcare providers</li>
            <li>Process and manage appointments</li>
            <li>Improve and personalize your experience</li>
            <li>Communicate with you about services, updates, and offers</li>
            <li>Comply with legal obligations</li>
            <li>Detect and prevent fraud</li>
            <li>Send administrative information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            3. HIPAA Compliance
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-gray-700 leading-relaxed mb-4">
              Insove is committed to compliance with the Health Insurance
              Portability and Accountability Act (HIPAA). We implement
              appropriate administrative, physical, and technical safeguards to
              protect your Protected Health Information (PHI).
            </p>
            <p className="text-gray-700 leading-relaxed">
              Healthcare providers using our platform are responsible for their
              own HIPAA compliance and act as covered entities or business
              associates as applicable.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            4. Information Sharing and Disclosure
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may share your information in the following circumstances:
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            With Healthcare Providers
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We share necessary information with clinics and healthcare providers
            to facilitate your appointments and care.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Service Providers
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may share information with third-party service providers who
            perform services on our behalf, such as:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Cloud hosting providers</li>
            <li>Payment processors</li>
            <li>Analytics services</li>
            <li>Customer support tools</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Legal Requirements
          </h3>
          <p className="text-gray-700 leading-relaxed">
            We may disclose your information if required to do so by law or in
            response to valid requests by public authorities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            5. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement a variety of security measures to maintain the safety
            of your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Employee training on data protection</li>
            <li>Secure data centers</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            However, no method of transmission over the Internet is 100% secure,
            and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            6. Your Privacy Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>
              <strong>Access:</strong> Request access to your personal
              information
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate
              information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your information
            </li>
            <li>
              <strong>Portability:</strong> Request a copy of your data in a
              portable format
            </li>
            <li>
              <strong>Opt-out:</strong> Opt-out of marketing communications
            </li>
            <li>
              <strong>Restriction:</strong> Request restriction of processing
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            To exercise these rights, please contact us using the information
            provided below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            7. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to track activity
            on our platform and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-700">
              <strong>Essential Cookies:</strong> Required for the platform to
              function
            </p>
            <p className="text-gray-700">
              <strong>Analytics Cookies:</strong> Help us understand how
              visitors use our site
            </p>
            <p className="text-gray-700">
              <strong>Marketing Cookies:</strong> Used to track visitors across
              websites
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            8. Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our Service is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13. If you become aware that a child has provided us with personal
            information, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            9. International Data Transfers
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your information may be transferred to and maintained on computers
            located outside of your state, province, country, or other
            governmental jurisdiction where data protection laws may differ. We
            take steps to ensure that your data is treated securely and in
            accordance with this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            10. Data Retention
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            11. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date. You are advised to review this
            Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            12. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Privacy Officer</strong>
            </p>
            <p className="text-gray-700">Email: privacy@insove.com</p>
            <p className="text-gray-700">Phone: [Your Phone Number]</p>
            <p className="text-gray-700">Address: [Your Business Address]</p>
            <p className="text-gray-700 mt-4">
              For HIPAA-related inquiries: hipaa@insove.com
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-block bg-cyan-500 text-white px-8 py-3 rounded-full font-medium hover:bg-cyan-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
