import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './Styles';

class PrivacyPolicy extends Component {
  render() {
    return (
      <View style={styles.legalContainer}>
        <ScrollView>
          <View style={styles.titleStyle}>
            <Text style={{ fontFamily: 'quicksand-bold', fontSize: 20 }}>
              Privacy Policy
            </Text>
          </View>

          <View style={styles.contentStyle}>
            <Text style={{ fontFamily: 'quicksand-light', fontSize: 15 }}>
              Benten Construction Sdn. Bhd. built the Aladin app as a Free app. This SERVICE is provided by Benten Construction Sdn. Bhd. at no cost and is intended for use as is.
              This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
              If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
              The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Aladin unless otherwise defined in this Privacy Policy.
              {"\n"}{"\n"}
              Information Collection and Use
              {"\n"}
              For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Company Name, Name, Phone Number, Location, Profession, Number of Staff in Company, Years of Establish, Email, Address. The information that we request is will be retained by us and used as described in this privacy policy.
              The app does use third party services that may collect information used to identify you.
              Link to privacy policy of third party service providers used by the app{"\n"}
              - Google Play Services{"\n"}
              - AdMob{"\n"}
              - Firebase Analytics{"\n"}
              - Piwik{"\n"}
              {"\n"}{"\n"}
              Log Data
              {"\n"}
              We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
              {"\n"}{"\n"}
              Cookies
              {"\n"}
              Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your device internal memory.
              This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collection information and to improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
              {"\n"}{"\n"}
              Service Providers
              {"\n"}
              We may employ third-party companies and individuals due to the following reasons:{"\n"}
              •	To facilitate our Service;{"\n"}
              •	To provide the Service on our behalf;{"\n"}
              •	To perform Service-related services; or{"\n"}
              •	To assist us in analyzing how our Service is used.{"\n"}
              We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
              {"\n"}{"\n"}
              Security
              {"\n"}
              We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
              {"\n"}{"\n"}
              Links to Other Sites
              {"\n"}
              This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              {"\n"}{"\n"}
              Children’s Privacy
              {"\n"}
              These Services do not address anyone under the age of 16. We do not knowingly collect personally identifiable information from children under 16. In the case we discover that a child under 16 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
              {"\n"}{"\n"}
              Changes to This Privacy Policy
              {"\n"}
              We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
              {"\n"}{"\n"}
              Contact Us
              {"\n"}
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PrivacyPolicy;
