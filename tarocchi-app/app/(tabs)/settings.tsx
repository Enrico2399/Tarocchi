import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="gearshape" // Nome icona corretto per SFSymbols
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Impostazioni</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Account</ThemedText>
        <SettingItem 
          title="Profilo utente" 
          icon="person" 
          onPress={() => console.log('Profile pressed')} 
        />
        <SettingItem 
          title="Sicurezza" 
          icon="lock" 
          onPress={() => console.log('Security pressed')} 
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Preferenze</ThemedText>
        <SettingItem 
          title="Notifiche" 
          icon="bell" 
          rightComponent={
            <Switch 
              value={notificationsEnabled} 
              onValueChange={setNotificationsEnabled}
            />
          }
        />
        <SettingItem 
          title="Modalità scura" 
          icon="moon" 
          rightComponent={
            <Switch 
              value={darkModeEnabled} 
              onValueChange={setDarkModeEnabled}
            />
          }
        />
        <SettingItem 
          title="Lingua" 
          icon="globe" 
          value="Italiano" 
          onPress={() => console.log('Language pressed')} 
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Informazioni</ThemedText>
        <SettingItem 
          title="Aiuto e supporto" 
          icon="questionmark.circle" 
          onPress={() => console.log('Help pressed')} 
        />
        <SettingItem 
          title="Termini e condizioni" 
          icon="doc.text" 
          onPress={() => console.log('Terms pressed')} 
        />
        <SettingItem 
          title="Versione app" 
          icon="info.circle" 
          value="1.0.0" 
        />
      </ThemedView>

      <ThemedView style={styles.logoutSection}>
        <SettingItem 
          title="Esci dall'account" 
          icon="power" 
          titleStyle={{ color: 'red' }}
          onPress={() => console.log('Logout pressed')} 
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

type SettingItemProps = {
  title: string;
  icon: string;
  value?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  titleStyle?: any;
};

function SettingItem({ title, icon, value, onPress, rightComponent, titleStyle }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <IconSymbol name={icon as any} size={20} color="#000000" style={styles.settingIcon} />
      <ThemedText style={[styles.settingTitle, titleStyle]}>{title}</ThemedText>
      {value && <ThemedText style={styles.settingValue}>{value}</ThemedText>}
      {rightComponent || <IconSymbol name="chevron.right" size={16} color="#888" style={styles.chevron} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  logoutSection: {
    marginTop: 15,
    marginBottom: 40,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  settingIcon: {
    marginRight: 15,
    width: 24,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
  },
  settingValue: {
    fontSize: 16,
    color: '#888',
    marginRight: 5,
  },
  chevron: {
    opacity: 0.7,
  },
});